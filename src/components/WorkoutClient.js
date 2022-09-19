import { useState, useEffect } from 'react';
import { FaTrashAlt } from 'react-icons/fa';

const WorkoutClient = ({ id, setToDel, presId }) => {
  const [clientInfo, setclientInfo] = useState({});

  useEffect(() => {
    const getClientInfo = async () => {
      const clientsFromServer = await FetchClientInfo();
      setclientInfo(clientsFromServer);
    };
    getClientInfo();
  }, []);

  // Fetch presence
  const FetchClientInfo = async () => {
    const res = await fetch(`http://localhost:5000/clients/${id}`);
    const data = await res.json();
    return data;
  };

  return (
    <>
      <td className="text-primary">
        <strong>
          {clientInfo.name} {clientInfo.surname}
        </strong>
      </td>
      <td>{clientInfo.email}</td>
      <td>{clientInfo.phone}</td>
      <td>
        <FaTrashAlt
          style={{ color: 'red', cursor: 'pointer' }}
          data-bs-toggle="modal"
          data-bs-target="#deleteModal"
          onClick={() => {
            setToDel({ ...clientInfo, id: presId });
          }}
        />
      </td>
    </>
  );
};
export default WorkoutClient;
