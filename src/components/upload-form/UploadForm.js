import './UploadForm.css';

function UploadForm({
  errorExists,
  imageName,
  onChange,
  onSubmit,
  submitting,
  privateUploadChecked,
  setPrivateUploadChecked
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
      <PrivateUploadCheckbox
        checked={privateUploadChecked}
        setValue={setPrivateUploadChecked}
      />
    </div>
  );
}

/**
 * @description Private upload checkbox component
 * @param {Object} props
 * @returns {Object}
 */
function PrivateUploadCheckbox({
  checked,
  setValue
}) {
  return (
    <div className="private-upload-checkbox-container">
      <label htmLFor="private-upload-checkbox">Private Upload? </label>
      <input
        checked={checked}
        id="private-upload-checkbox"
        name="private-upload-checkbox"
        onChange={setValue}
        type="checkbox"
      />
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