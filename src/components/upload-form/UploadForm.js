import './UploadForm.css';

function UploadForm({
  imageName,
  onChange
}) {
  return (
    <div className="upload-form">
      <div className="upload-form-file-name">{imageName ? imageName : 'No Image Chosen'}</div>
      <div className="upload-form-browse-button-container">
        <button className="upload-form-button upload-form-browse-button">Browse Images</button>
        <input
          accept="image/*"
          className="upload-form-file-input"
          multiple={false}
          onChange={onChange}
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