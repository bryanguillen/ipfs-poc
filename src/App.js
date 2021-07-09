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

function App() {
  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState('');
  const [modalData, setModalData] = useState({ title: 'Select Action', route: '' });
  const [privateUploadChecked, setPrivateUploadChecked] = useState(false);
  const [submittingForm, setSubmittingForm] = useState(false);
  const [uploadFormError, setUploadFormError] = useState(false);

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
    if (imageUrl) {
      setModalData({ title: 'File Upload Success', route: FILE_UPLOAD_SUCCESS });
    }
  }, [imageUrl]);

  /**
   * @description Function used to handle submit
   * @returns {undefined}
   */
  async function onSubmit() {
    setSubmittingForm(true);
    uploadFileToIpfs()
      .then(url => {
        setImageUrl(url);
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
            onChange={(event) => setImage(event.target.files[0])}
            onSubmit={onSubmit}
            privateUploadChecked={privateUploadChecked}
            setPrivateUploadChecked={() => setPrivateUploadChecked(previousState => !previousState)}
            submitting={submittingForm}
          />
        )
      case IMAGE_PREVIEW:
        return (
          <ImagePreview
            imageUrl={imageUrl}
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
      const ipfsClient = create('http://localhost:5001');
      const uploadedFile = await ipfsClient.add(image)
      return `http://localhost:9090/ipfs/${uploadedFile.path}`;
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

export default App;
