import AppModal from '../app-modal/AppModal';
import './ImagePreview.css';

function ImagePreview({
  imageUrl
}) {
  return (
    <AppModal>
      <div className="image-preview-container">
        <div className="image-preview-container-header">Image On IPFS</div>
        <img
          src={imageUrl}
          className="image-preview"
          alt="image from ipfs"
        />
      </div>
    </AppModal>
  );
}

export default ImagePreview;