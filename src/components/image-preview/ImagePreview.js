import './ImagePreview.css';

function ImagePreview({
  imageUrl
}) {
  return (
    <div className="image-preview-container">
      <img
        src={imageUrl}
        className="image-preview"
        alt="ipfs"
      />
    </div>
  );
}

export default ImagePreview;