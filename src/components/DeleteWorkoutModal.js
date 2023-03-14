const DeletePersonModal = ({ workoutToDelete, onDelete, headerText }) => {
  const time = new Date(workoutToDelete.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  const date = new Date(workoutToDelete.timestamp).toLocaleDateString();

  return (
    <div className="modal fade" id="deleteWorkoutModal" tabIndex="-1" aria-labelledby="deleteModalLabel" aria-hidden="true">
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="deleteModalLabel">
              {headerText}
            </h5>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div className="modal-body">
            <h4>
              {workoutToDelete.name} {' - '}
              <span className="fw-light">
                {workoutToDelete.day} {`(${date}) - `}
                {time}
              </span>
            </h4>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
              Anuluj
            </button>
            <button type="button" className="btn btn-danger" data-bs-dismiss="modal" onClick={() => onDelete(workoutToDelete.id)}>
              Usuń
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default DeletePersonModal;
