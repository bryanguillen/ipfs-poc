import { IoCloudUpload } from 'react-icons/io5';
import './IntroSelections.css';

function IntroSelections({
  showUploadForm
}) {
  return (
    <div className="intro-selections">
      <button
        className="intro-selections-button intro-selections-upload-button"
        onClick={showUploadForm}
      >
        <span className="intro-selections-icon">
          <IoCloudUpload
            size={'3rem'}
          />
        </span>
        <span>Upload Image</span>
      </button>
    </div>
  );
}

export default IntroSelections;