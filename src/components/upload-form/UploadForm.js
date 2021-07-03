import './UploadForm.css';

function UploadForm() {
  return (
    <div className="upload-form">
      <div className="upload-form-file-name">No File Chosen</div>
      <div className="upload-form-browse-button-container">
        <button className="upload-form-button upload-form-browse-button">Browse</button>
        <input
          className="upload-form-file-input"
          type="file"
        />
      </div>
      <div className="upload-form-submit-button-container">
        <button className="upload-form-button upload-form-submit-button">Submit</button>
      </div>
    </div>
  );
}

export default UploadForm;