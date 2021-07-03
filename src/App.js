import { useState } from 'react';
import { create } from 'ipfs-http-client';
import UploadForm from './components/upload-form/UploadForm'
import './App.css';

function App() {
  const [image, setImage] = useState(null);

  /**
   * @description Function used to handle submit
   * @returns {undefined}
   */
  async function onSubmit() {
    await uploadFileToIpfs().catch(error => console.log(error));
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
      const url = `https://ipfs.infura.io/ipfs/${uploadedFile.path}`
      console.log(url);
    } catch (error) {
      throw error;
    }
  }

  return (
    <div className="app">
      <UploadForm
        imageName={image ? image.name : ''}
        onChange={(event) => setImage(event.target.files[0])}
        onSubmit={onSubmit}
      />
    </div>
  );
}

export default App;
