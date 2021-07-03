import './UploadForm.css';

function UploadForm({
  errorExists,
  imageName,
  onChange,
  onSubmit,
  submitting
}) {
  return (
    <div className="upload-form-container">
      {errorExists ? <div className="upload-form-error">Oops!  Something went wrong.  Check console.</div> : null}
      <div className="upload-form-file-name">{imageName ? imageName : 'No Image Chosen'}</div>
      <div className="upload-form-browse-button-container">
        <button className="button-secondary">Browse Images</button>
        {!submitting ? 
          <input
            accept="image/*"
            className="upload-form-file-input"
            multiple={false}
            onChange={onChange}
            type="file"
          /> :
          null
        }
      </div>
      {
        imageName ? 
          <div className="upload-form-submit-button-container">
            {
              !submitting ?
                <SubmitButton
                  label={'Submit'}
                  onClick={onSubmit}
                /> :
                <SubmitButton
                  label={'Submitting...'}
                />
            }
          </div> :
          null
      }
    </div>
  );
}

/**
 * @description Wrapper for the submit button to avoid duplicating code
 */
function SubmitButton({
  label,
  onClick
}) {
  return (
    <button className="button-primary" onClick={onClick}>{label}</button>
  );
}

export default UploadForm;