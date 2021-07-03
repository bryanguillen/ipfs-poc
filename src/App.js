import { useState } from 'react';
import { create } from 'ipfs-http-client';
import ImagePreview from './components/image-preview/ImagePreview';
import UploadForm from './components/upload-form/UploadForm'
import './App.css';

function App() {
  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState('');
  const [uploadFormError, setUploadFormError] = useState(false);

  /**
   * @description Function used to handle submit
   * @returns {undefined}
   */
  async function onSubmit() {
    uploadFileToIpfs()
      .then(url => {
        setImageUrl(url);
      })
      .catch(error => {
        console.log(error);
        setUploadFormError(true);
      });
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
      {
        imageUrl ?
            <ImagePreview
              imageUrl={imageUrl}
            />
          :
            <UploadForm
              errorExists={uploadFormError}
              imageName={image ? image.name : ''}
              onChange={(event) => setImage(event.target.files[0])}
              onSubmit={onSubmit}
            />
      }
    </div>
  );
}

export default App;
