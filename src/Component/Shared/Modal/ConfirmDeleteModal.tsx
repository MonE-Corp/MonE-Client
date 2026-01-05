// features/shared/components/ConfirmDeleteModal.tsx
interface ConfirmDeleteModalProps {
  show: boolean;
  title?: string;
  message?: string;
  onCancel: () => void;
  onConfirm: () => void;
}

export const ConfirmDeleteModal = ({
  show, title = "Confirm Delete", message = "Are you sure?", onCancel, onConfirm
}: ConfirmDeleteModalProps) => {
  if (!show) return null;
  return (
    <div className="modal fade show d-block" style={{ background: "rgba(0,0,0,0.5)" }}>
      <div className="modal-dialog modal-sm">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">{title}</h5>
          </div>
          <div className="modal-body">
            <p>{message}</p>
          </div>
          <div className="modal-footer">
            <button className="btn btn-secondary" onClick={onCancel}>Cancel</button>
            <button className="btn btn-danger" onClick={onConfirm}>Delete</button>
          </div>
        </div>
      </div>
    </div>
  );
};
