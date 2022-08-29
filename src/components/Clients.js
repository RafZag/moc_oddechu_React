import { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
import { FaTrashAlt } from 'react-icons/fa';
import DeletePersonModal from './DeletePersonModal';
import AddPersonModal from './AddPersonModal';

const Clients = ({ onSelect }) => {
  const [clients, setClients] = useState([]);
  const [clientToDelete, setToDelete] = useState({});

  useEffect(() => {
    const getClients = async () => {
      const clientsFromServer = await fetchClients();
      setClients(clientsFromServer);
    };

    getClients();
  }, []);

  // Fetch Clients
  const fetchClients = async () => {
    const res = await fetch('http://localhost:5000/clients');
    const data = await res.json();
    return data;
  };

  //Delete Client
  const deleteClient = async (id) => {
    const res = await fetch(`http://localhost:5000/clients/${id}`, {
      method: 'DELETE',
    });
    //We should control the response status to decide if we will change the state or not.
    res.status === 200 ? setClients(clients.filter((client) => client.id !== id)) : alert('Error Deleting This Client');
  };

  // Add Client
  const addClient = async (client) => {
    const res = await fetch('http://localhost:5000/clients', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(client),
    });

    const data = await res.json();

    setClients([...clients, data]);
  };

  // const navigate = useNavigate();
  return (
    <>
      <div className="rounded bg-white p-3 mb-4">
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
            {clients.map((client, index) => (
              <tr key={index}>
                <td className="text-primary" style={{ cursor: 'pointer' }} onClick={() => onSelect(client.name)}>
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
      </div>

      {/* <AddClient onAdd={addClient} /> */}
      <button type="button" className="btn btn-success" data-bs-toggle="modal" data-bs-target="#addModal">
        Dodaj klienta
      </button>
      <AddPersonModal onAdd={addClient} headerText={'Dodaj nowego klienta'} />
      <DeletePersonModal onDelete={deleteClient} clientToDelete={clientToDelete} headerText={'Usunąć klienta?'} />
    </>
  );
};
export default Clients;
