import './AppModal.css';

function AppModal({
  children,
  title
}) {
  return (
    <div className="app-modal">
      <div className="app-modal-header">{title}</div>
      <div className="app-modal-body">{children}</div>
    </div>
  )
}

export default AppModal;