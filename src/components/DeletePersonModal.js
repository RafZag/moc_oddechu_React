const DeletePersonModal = ({ clientToDelete, onDelete, headerText }) => {
  return (
    <div className="modal fade" id="deleteModal" tabIndex="-1" aria-labelledby="deleteModalLabel" aria-hidden="true">
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="deleteModalLabel">
              {headerText}
            </h5>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div className="modal-body">
            <h3 className="text-primary">
              {clientToDelete.name} {clientToDelete.surname}
            </h3>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
              Anuluj
            </button>
            <button type="button" className="btn btn-danger" data-bs-dismiss="modal" onClick={() => onDelete(clientToDelete.id)}>
              Usuń
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default DeletePersonModal;
