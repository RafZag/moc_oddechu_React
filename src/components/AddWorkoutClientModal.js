import { useState, useEffect } from 'react';
import { db } from '../firebase-config';
import { collection, getDocs } from 'firebase/firestore';

const AddWorkoutClientModal = ({ onAdd }) => {
  const [clients, setClients] = useState([]);
  const [clientId, setClientId] = useState('');

  const clientsCollectionRef = collection(db, 'clients');

  useEffect(() => {
    getClients();
  }, []);

  const getClients = async () => {
    const data = await getDocs(clientsCollectionRef);
    setClients(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };

  // useEffect(() => {
  //   const getClients = async () => {
  //     const clientsFromServer = await fetchClients();
  //     setClients(clientsFromServer);
  //   };

  //   getClients();
  // }, []);

  // Fetch Clients
  // const fetchClients = async () => {
  //   const res = await fetch('http://localhost:5000/clients');
  //   const data = await res.json();
  //   return data;
  // };

  const onSubmit = (e) => {
    e.preventDefault();
    if (!clientId) {
      alert('Wybierz klienta');
      return;
    }
    onAdd({ clientId });
    setClientId('');
  };

  const onCancel = () => {
    setClientId('');
  };

  return (
    <div className="modal fade" id="addModal" tabIndex="-1" aria-labelledby="addModalLabel" aria-hidden="true">
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="addModalLabel">
              Zapisz klienta
            </h5>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={() => onCancel()}></button>
          </div>
          <div className="modal-body">
            <form className="mt-4 needs-validation" onSubmit={onSubmit}>
              <div className="mb-3">
                <select className="form-select" value={clientId} onChange={(e) => setClientId(e.target.value)} required>
                  <option defaultValue>Wybierz klienta</option>
                  {clients.map((client, index) => (
                    <option key={index} value={client.id}>
                      {client.name} {client.surname}
                    </option>
                  ))}
                </select>
              </div>
              <div className="position-relative d-flex align-items-center py-3 modal-footer">
                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={() => onCancel()}>
                  Anuluj
                </button>
                <input type="submit" value="Dodaj" data-bs-dismiss="modal" className="btn btn-success" />
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
export default AddWorkoutClientModal;
