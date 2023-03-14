import { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
import { FaTrashAlt } from 'react-icons/fa';
import DeletePersonModal from './DeletePersonModal';
import AddPersonModal from './AddPersonModal';
import { db } from '../firebase-config';
import { collection, getDocs, addDoc, deleteDoc, doc } from 'firebase/firestore';

const Clients = ({ onSelect }) => {
  const [clients, setClients] = useState([]);
  const [clientToDelete, setToDelete] = useState({});

  const clientsCollectionRef = collection(db, 'clients');

  const getClients = async () => {
    const data = await getDocs(clientsCollectionRef);
    setClients(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };

  useEffect(() => {
    getClients();
  }, []);

  const deleteClient = async (id) => {
    deleteDoc(doc(db, 'clients', id))
      .then((docRef) => {
        getClients();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const addClient = async (teacher) => {
    addDoc(clientsCollectionRef, teacher)
      .then((docRef) => {
        getClients();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // const navigate = useNavigate();
  return (
    <>
      <div className="rounded bg-white p-3 mb-4 shadow-sm">
        <table className="table table-hover">
          <thead>
            <tr>
              <th scope="col">Imię i Nazwisko</th>
              <th scope="col">e-mail</th>
              <th scope="col">Telefon</th>
              <th scope="col">Usuń</th>
            </tr>
          </thead>
          <tbody>
            {clients.map((client) => (
              <tr key={client.id}>
                <td className="text-primary" onClick={() => onSelect(client.name)}>
                  <strong>
                    {client.name} {client.surname}
                  </strong>
                </td>
                <td>{client.email}</td>
                <td>{client.phone}</td>
                <td>
                  <FaTrashAlt
                    style={{ color: 'red', cursor: 'pointer' }}
                    data-bs-toggle="modal"
                    data-bs-target="#deleteModal"
                    onClick={() => {
                      setToDelete(client);
                    }}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#addModal">
          Dodaj klienta
        </button>
      </div>

      <AddPersonModal onAdd={addClient} headerText={'Dodaj nowego klienta'} />
      <DeletePersonModal onDelete={deleteClient} clientToDelete={clientToDelete} headerText={'Usunąć klienta?'} />
    </>
  );
};
export default Clients;
