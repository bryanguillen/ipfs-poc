import './ImagePreview.css';

function ImagePreview({
  imageUrl
}) {
  return (
    <div className="image-preview-container">
      <video>
        <source src={imageUrl}/>
      </video>
    </div>
  );
}

export default ImagePreview;