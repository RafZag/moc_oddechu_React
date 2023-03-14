import { useState, useEffect } from 'react';
import { FaTrashAlt } from 'react-icons/fa';
import { db } from '../firebase-config';
import { collection, doc, getDoc } from 'firebase/firestore';

const WorkoutClient = ({ id, setToDel, presId }) => {
  const [clientInfo, setclientInfo] = useState({});

  const clientsCollectionRef = collection(db, 'clients');

  const getClientInfo = async (id) => {
    const teacherDoc = doc(db, 'clients', id);
    const docSnap = await getDoc(teacherDoc);
    const data = docSnap.exists() ? docSnap.data() : '';

    setclientInfo(data);
  };

  useEffect(() => {
    getClientInfo(id);
  }, []);

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
