import { IoCloudUpload, IoSave } from 'react-icons/io5';
import './IntroSelections.css';

function IntroSelections({
  showDbInteractionUi,
  showUploadForm
}) {
  return (
    <div className="intro-selections">
      <button
        className="intro-selections-button"
        onClick={showUploadForm}
      >
        <span className="intro-selections-icon">
          <IoCloudUpload
            size={'3rem'}
          />
        </span>
        <span>Upload Image</span>
      </button>
      <button
        className="intro-selections-button intro-selections-button-db"
        onClick={showDbInteractionUi}
      >
        <span className="intro-selections-icon">
          <IoSave
            size={'3rem'}
          />
        </span>
        <span>Interact With DB</span>
      </button>
    </div>
  );
}

export default IntroSelections;