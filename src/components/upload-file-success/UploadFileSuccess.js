import { useState } from 'react';
import { IoCheckmarkCircleOutline } from 'react-icons/io5';
import './UploadFileSuccess.css';

function UploadFileSuccess({
  imageUrl
}) {
  const [urlCopied, setUrlCopied] = useState(false);

  /**
   * @description Wrapper for whenever the URL is copied
   * @returns {undefined}
   */
  function copyUrl() {
    navigator.clipboard.writeText(imageUrl);
    setUrlCopied(true);
  }

  return (
    <div className="upload-file-success-container">
      <div className="upload-file-success-icon">
        <IoCheckmarkCircleOutline color={'green'} size={'7.5rem'}/>
      </div>
      <div className="upload-file-success-url">{imageUrl}</div>
      <div className="upload-file-success-buttons-container">
        <button className="button-secondary block-level-button" onClick={copyUrl}>Copy URL</button>
        {urlCopied ? <button className="button-primary block-level-button">View File Button</button> : null}
      </div>
    </div>
  )
}

export default UploadFileSuccess;