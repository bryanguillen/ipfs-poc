import { useState } from 'react';

import UploadForm from './components/upload-form/UploadForm'

import './App.css';

function App() {
  const [image, setImage] = useState(null);

  return (
    <div className="app">
      <UploadForm
        imageName={image ? image.name : ''}
        onChange={(event) => setImage(event.target.files[0])}
      />
    </div>
  );
}

export default App;
