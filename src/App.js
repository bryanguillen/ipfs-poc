import { useEffect, useState } from 'react';
import { create } from 'ipfs-http-client';
import AppModal from './components/app-modal/AppModal';
import ImagePreview from './components/image-preview/ImagePreview';
import UploadFileSuccess from './components/upload-file-success/UploadFileSuccess'
import UploadForm from './components/upload-form/UploadForm'
import './App.css';

function App() {
  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState('');
  const [modalTitle, setModalTitle] = useState('Upload Image')
  const [submittingForm, setSubmittingForm] = useState(false);
  const [uploadFormError, setUploadFormError] = useState(false);
  const [viewName, setViewName] = useState('');

  const FILE_UPLOAD_SUCCESS = 'file-upload-success';
  const IMAGE_PREVIEW = 'image-preview';

  /**
   * @description Effect for updating the view name when an image is uploaded;
   * it's needed b/c we need the image url first, and since state updates
   * can be async, this is the safest way of triggering the view update
   */
  useEffect(() => {
    // Do not run on init
    if (imageUrl) {
      setViewName(FILE_UPLOAD_SUCCESS);
      setModalTitle('File Upload Success');
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
    switch(viewName) {
      case FILE_UPLOAD_SUCCESS:
        return (
          <UploadFileSuccess
            viewImage={() => {
              setModalTitle('File On IPFS');
              setViewName(IMAGE_PREVIEW);
            }}
          />
        )
      case IMAGE_PREVIEW:
        return (
          <ImagePreview
            imageUrl={imageUrl}
          />
        );
      default:
        return (
          <UploadForm
            errorExists={uploadFormError}
            imageName={image ? image.name : ''}
            onChange={(event) => setImage(event.target.files[0])}
            onSubmit={onSubmit}
            submitting={submittingForm}
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
      const ipfsClient = create('https://ipfs.infura.io:5001/api/v0');
      const uploadedFile = await ipfsClient.add(image)
      return `https://ipfs.infura.io/ipfs/${uploadedFile.path}`
    } catch (error) {
      throw error;
    }
  }

  return (
    <div className="app">
      <AppModal title={modalTitle}>
        {renderView()}
      </AppModal>
    </div>
  );
}

export default App;
