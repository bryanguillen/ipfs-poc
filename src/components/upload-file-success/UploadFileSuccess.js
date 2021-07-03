import { IoCheckmarkCircleOutline } from 'react-icons/io5';
import './UploadFileSuccess.css';

function UploadFileSuccess({
  imageUrl,
  viewImage
}) {
  return (
    <div className="upload-file-success-container">
      <div className="upload-file-success-icon">
        <IoCheckmarkCircleOutline color={'green'} size={'7.5rem'}/>
      </div>
      <div className="upload-file-success-url">{imageUrl}</div>
      <button className="button-primary block-level-button" onClick={viewImage}>View File</button>
    </div>
  )
}

export default UploadFileSuccess;