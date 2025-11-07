// src/components/ConfirmDeleteModal.jsx
import "./ConfirmDeleteModal.css";

export default function ConfirmDeleteModal({ blog, onConfirm, onCancel }) {
  return (
    <div className="modal-backdrop" onClick={onCancel}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h3>Delete Blog?</h3>
        <p>
          Are you sure you want to delete <strong>"{blog.title}"</strong>?
          This cannot be undone.
        </p>
        <div className="modal-actions">
          <button onClick={onCancel} className="cancel-btn">
            Cancel
          </button>
          <button onClick={onConfirm} className="delete-confirm-btn">
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}