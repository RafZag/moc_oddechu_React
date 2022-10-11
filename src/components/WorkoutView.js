import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import WorkoutClient from './WorkoutClient';
import DeletePersonModal from './DeletePersonModal';
import DeleteWorkoutModal from './DeleteWorkoutModal';
import AddWorkoutClientModal from './AddWorkoutClientModal';
import { db } from '../firebase-config';
import { collection, getDocs, addDoc, deleteDoc, doc, getDoc, query, where } from 'firebase/firestore';

const WorkoutsView = (props) => {
  const [workoutInfo, setWorkoutInfo] = useState({});
  const [teacherName, setteacherName] = useState('');
  const [teacherSurname, setteacherSurname] = useState('');
  const [presence, setPresence] = useState([]);
  const [presenceToDelete, setToDelete] = useState({});

  const presenceCollectionRef = collection(db, 'presence');

  const params = useParams();

  const navigate = useNavigate();

  useEffect(() => {
    getWorkoutInfo();
    getPresence();
  }, []);

  const getWorkoutInfo = async () => {
    const workoutDoc = doc(db, 'workouts', params.id);
    const docSnap = await getDoc(workoutDoc);
    const data = docSnap.exists() ? docSnap.data() : null;

    setWorkoutInfo(data);
    getTeacherInfo(data.teacherId);
  };

  const getTeacherInfo = async (id) => {
    const teacherDoc = doc(db, 'teachers', id);
    const docSnap = await getDoc(teacherDoc);
    const data = docSnap.exists() ? docSnap.data() : null;

    setteacherName(data.name);
    setteacherSurname(data.surname);
  };

  const getPresence = async () => {
    const q = query(presenceCollectionRef, where('workoutId', '==', params.id));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      const p = { ...doc.data(), id: doc.id };
      setPresence((prevPresence) => {
        return [...prevPresence, p];
      });
    });

    // setPresence(querySnapshot);
    // getTeacherInfo(data.teacherId);
  };

  // useEffect(() => {
  //   const getWorkoutInfo = async () => {
  //     const workoutInfoFromServer = await fetchWorkoutInfo();
  //     setWorkoutInfo(workoutInfoFromServer);
  //   };
  //   getWorkoutInfo();

  //   const getPresence = async () => {
  //     const presenceFromServer = await FetchPresence();
  //     setPresence(presenceFromServer);
  //   };
  //   getPresence();
  // }, []);

  // // Fetch Workout Info
  // const fetchWorkoutInfo = async () => {
  //   const res = await fetch(`http://localhost:5000/workouts/${params.id}?_expand=teacher`);
  //   const data = await res.json();
  //   setteacherName(data.teacher.name);
  //   setteacherSurname(data.teacher.surname);
  //   return data;
  // };

  // // Fetch presence
  // const FetchPresence = async () => {
  //   const res = await fetch(`http://localhost:5000/presence?workoutId=${params.id}`);
  //   const data = await res.json();

  //   return data;
  // };

  // Add Presence
  // const addPresence = async (client) => {
  //   const p = {
  //     workoutId: parseInt(params.id),
  //     clientId: client.clientId,
  //   };

  //   const res = await fetch('http://localhost:5000/presence', {
  //     method: 'POST',
  //     headers: {
  //       'Content-type': 'application/json',
  //     },
  //     body: JSON.stringify(p),
  //   });

  //   const data = await res.json();

  //   setPresence((prevPresence) => {
  //     return [...prevPresence, data];
  //   });
  // };

  const addPresence = async (client) => {
    const p = {
      workoutId: params.id,
      clientId: client.clientId,
    };

    addDoc(presenceCollectionRef, p)
      .then((docRef) => {
        setPresence((prevPresence) => {
          return [...prevPresence, p];
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // Set to delete

  const setToDel = (toDel) => {
    setToDelete(toDel);
  };

  const deletePresence = async (id) => {
    deleteDoc(doc(db, 'presence', id))
      .then((docRef) => {
        setPresence(presence.filter((pr) => pr.id !== id));
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const deleteWorkout = async (id) => {
    const q = query(presenceCollectionRef, where('workoutId', '==', params.id));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((d) => {
      deleteDoc(doc(db, 'presence', d.id));
      // console.log(doc);
    });
    deleteDoc(doc(db, 'workouts', params.id)).then(navigate(`/`));
  };

  //Delete presence
  // const deletePresence = async (presId) => {
  //   const res = await fetch(`http://localhost:5000/presence/${presId}`, {
  //     method: 'DELETE',
  //   });
  //   //We should control the response status to decide if we will change the state or not.

  //   // setPresence(presence.filter((pr) => pr.id !== presId));
  //   // res.status === 200 ? window.location.reload() : alert('Error Deleting This Client');
  //   res.status === 200 ? setPresence(presence.filter((pr) => pr.id !== presId)) : alert('Error Deleting This Client');
  // };

  const time = new Date(workoutInfo.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  const date = new Date(workoutInfo.timestamp).toLocaleDateString();

  return (
    <>
      <div className="rounded bg-white p-3 mb-4 shadow-sm">
        <div className="container mb-4 rounded bg-secondary p-3 text-white">
          <h3>
            {workoutInfo.name} {' - '}
            <span className="fw-light">
              {workoutInfo.day} {`(${date}) - `}
              {time}
            </span>
            <div className="float-end">
              {teacherName} {teacherSurname}
              <span className="fw-light"> </span>
            </div>
          </h3>
        </div>

        {presence.length > 0 ? (
          <table className="table table-hover mt-4 mb-4">
            <thead>
              <tr>
                <th scope="col">Klient</th>
                <th scope="col">e-mail</th>
                <th scope="col">Telefon</th>
                <th scope="col">Usuń</th>
              </tr>
            </thead>
            <tbody>
              {presence.map((pres, index) => (
                <tr key={pres.clientId}>
                  <WorkoutClient id={pres.clientId} setToDel={setToDel} presId={pres.id} />
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="container text-center py-3 text-secondary">
            <h3>Brak zapisanych klientów</h3>
          </div>
        )}
        <div className="container position-relative">
          <button className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#addModal">
            Zapisz klienta
          </button>
          <button className="btn btn-danger end-0 position-absolute" data-bs-toggle="modal" data-bs-target="#deleteWorkoutModal">
            Usuń Zajęcia
          </button>
        </div>
      </div>
      <AddWorkoutClientModal onAdd={addPresence} />
      <DeletePersonModal onDelete={deletePresence} clientToDelete={presenceToDelete} headerText={'Usunąć klienta?'} />
      <DeleteWorkoutModal onDelete={deleteWorkout} workoutToDelete={workoutInfo} headerText={'Usunąć Zajęcia?'} />
    </>
  );
};
export default WorkoutsView;
