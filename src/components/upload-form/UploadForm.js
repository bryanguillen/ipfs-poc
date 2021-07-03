import AppModal from '../app-modal/AppModal';
import './UploadForm.css';

function UploadForm({
  errorExists,
  imageName,
  onChange,
  onSubmit,
  submitting
}) {
  return (
    <AppModal>
      {errorExists ? <div className="upload-form-error">Oops!  Something went wrong.  Check console.</div> : null}
      <div className="upload-form-file-name">{imageName ? imageName : 'No Image Chosen'}</div>
      <div className="upload-form-browse-button-container">
        <button className="upload-form-button upload-form-browse-button">Browse Images</button>
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
    </AppModal>
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
    <button className="upload-form-button upload-form-submit-button" onClick={onClick}>{label}</button>
  );
}

export default UploadForm;