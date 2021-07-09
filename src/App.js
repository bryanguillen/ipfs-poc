import { useEffect, useState } from 'react';
import { create } from 'ipfs-http-client';
import AppModal from './components/app-modal/AppModal';
import ImagePreview from './components/image-preview/ImagePreview';
import IntroSelections from './components/intro-selections/IntroSelections';
import PersonForm from './components/person-form/PersonForm';
import StoredPeople from './components/stored-people/StoredPeople';
import UploadFileSuccess from './components/upload-file-success/UploadFileSuccess'
import UploadForm from './components/upload-form/UploadForm'
import './App.css';
import axios from 'axios';

function App() {
  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState('');
  const [decryptedUrl, setDecryptedUrl] = useState('')
  const [modalData, setModalData] = useState({ title: 'Select Action', route: '' });
  const [privateUploadChecked, setPrivateUploadChecked] = useState(false);
  const [submittingForm, setSubmittingForm] = useState(false);
  const [uploadFormError, setUploadFormError] = useState(false);

  const [keys, setKeys] = useState({ public: null, private: null, aes: null, iv: null });

  const FILE_UPLOAD_SUCCESS = 'file-upload-success';
  const IMAGE_PREVIEW = 'image-preview';
  const PERSON_FORM = 'person-form';
  const STORED_PEOPLE = 'stored-people';
  const UPLOAD_FORM = 'upload-form';

  /**
   * @description Effect for updating the view name when an image is uploaded;
   * it's needed b/c we need the image url first, and since state updates
   * can be async, this is the safest way of triggering the view update
   */
  useEffect(() => {
    // Do not run on init
    if (imageUrl && keys.aes !== null) {
      /**************************************************
       * DECRYPT
       **************************************************/
      axios.get(imageUrl, {
        responseType: 'arraybuffer',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/pdf'
        }
      })
        .then(response => response.data)
        .then(async encryptedFile => {
          const textDecoder = new TextDecoder();
          const decryptedAes = await crypto.subtle.decrypt('RSA-OAEP', keys.privateKey, keys.aes);
          const decodedKey = textDecoder.decode(decryptedAes);
          const importedKey = await crypto.subtle.importKey('jwk', JSON.parse(decodedKey), 'AES-GCM', true, ['decrypt', 'encrypt']);
          const decryptedIv = await crypto.subtle.decrypt('RSA-OAEP', keys.privateKey, keys.iv);
          const decryptedFile = await crypto.subtle.decrypt({ name: 'AES-GCM', iv: decryptedIv }, importedKey, encryptedFile);
          setDecryptedUrl(URL.createObjectURL(new File([decryptedFile], 'hello-world.mp4')));
        });
    }
  }, [imageUrl, keys]);
  
  useEffect(() => {
    if (decryptedUrl) {
      setModalData({ title: 'File Upload Success', route: FILE_UPLOAD_SUCCESS });
    }
  }, [decryptedUrl])

  /**
   * @description On change for the image
   * @param {Object} event
   * @returns {undefined}
   */
  function onChange(event) {
    const { files } = event.target;

    if (files.length > 0) {
      setImage(files[0]);
    }
  }

  /**
   * @description Function used to handle submit
   * @returns {undefined}
   */
  async function onSubmit() {
    setSubmittingForm(true);
    uploadFileToIpfs()
      .then(() => {
        setSubmittingForm(false);
      })
      .catch(error => {
        console.log(error);
        setUploadFormError(true);
        setSubmittingForm(false);
      });
  }

  /**
   * @description Function used to render the correct view within the modal;
   * it's essentially used to wrap the switch statement
   * @returns {Object}
   */
  function renderView() {
    switch(modalData.route) {
      case FILE_UPLOAD_SUCCESS:
        return (
          <UploadFileSuccess
            viewImage={() => setModalData({ title: 'Image On IPFS', route: IMAGE_PREVIEW})}
          />
        );
      case UPLOAD_FORM:
        return (
          <UploadForm
            errorExists={uploadFormError}
            imageName={image ? image.name : ''}
            onChange={onChange}
            onSubmit={onSubmit}
            privateUploadChecked={privateUploadChecked}
            setPrivateUploadChecked={() => setPrivateUploadChecked(previousState => !previousState)}
            submitting={submittingForm}
          />
        )
      case IMAGE_PREVIEW:
        return (
          <ImagePreview
            imageUrl={decryptedUrl}
          />
        );
      case PERSON_FORM:
        return (
          <PersonForm
            seeRecords={() => setModalData({ title: 'People', route: STORED_PEOPLE })}
          />
        );
      case STORED_PEOPLE:
        return (
          <StoredPeople/>
        );
      default:
        return (
          <IntroSelections
            showDbInteractionUi={() => setModalData({ title: 'Fill Out Form', route: PERSON_FORM })}
            showUploadForm={() => setModalData({ title: 'Upload Image', route: UPLOAD_FORM })}
          />
        )
    }
  }

  /**
   * @description Function used to abstract the lines of code needed to
   * upload a file to ipfs
   * @returns {undefined}
   */
  async function uploadFileToIpfs() {
    try {
      const ipfsClient = create('http://localhost:5002');
      let imageToBeUploaded;

      if (privateUploadChecked) {
        /**************************************************
         * ENCRYPT
         **************************************************/
        const key = await crypto.subtle.generateKey(
          {
            name: "AES-GCM",
            length: 256
          },
          true,
          ["encrypt", "decrypt"]
        );
        const exportedKeyStringified = JSON.stringify(await crypto.subtle.exportKey('jwk', key));
        const textEncoder = new TextEncoder();
        const encodedKey = textEncoder.encode(exportedKeyStringified);
        const rsaKeys = await crypto.subtle.generateKey(
          {
            name: "RSA-OAEP",
            modulusLength: 4096,
            publicExponent: new Uint8Array([1, 0, 1]),
            hash: "SHA-256"
          },
          true,
          ["encrypt", "decrypt"]
        );
        const imageBuffer = await toArrayBuffer(image);
        const iv = crypto.getRandomValues(new Uint8Array(12));
        const encryptedFile = await crypto.subtle.encrypt(
          {
            name: "AES-GCM",
            iv
          },
          key,
          imageBuffer
        );
        const encryptedAes = await crypto.subtle.encrypt('RSA-OAEP', rsaKeys.publicKey, encodedKey);
        const encryptedIv = await crypto.subtle.encrypt('RSA-OAEP', rsaKeys.publicKey, iv);

        const uploadedFile = await ipfsClient.add(encryptedFile);

        setKeys({ publicKey: rsaKeys.publicKey, privateKey: rsaKeys.privateKey, aes: encryptedAes, iv: encryptedIv});
        setImageUrl(`http://localhost:9090/ipfs/${uploadedFile.path}`);
      } else {
        const uploadedFile = await ipfsClient.add(image);
        return `http://localhost:9090/ipfs/${uploadedFile.path}`;
      }
    } catch (error) {
      throw error;
    }
  }

  return (
    <div className="app">
      <AppModal title={modalData.title}>
        {renderView()}
      </AppModal>
    </div>
  );
}

/**
 * @description Function used to get a buffer from a file, which is useful when encrypting
 * @param {Object} file
 * @returns {Promise}
 */
function toArrayBuffer(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsArrayBuffer(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
}

export default App;
