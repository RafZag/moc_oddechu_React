import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import WorkoutClient from './WorkoutClient';
import DeletePersonModal from './DeletePersonModal';
import AddWorkoutClientModal from './AddWorkoutClientModal';

const WorkoutsView = (props) => {
  const [workoutInfo, setWorkoutInfo] = useState({});
  const [teacherName, setteacherName] = useState('');
  const [teacherSurname, setteacherSurname] = useState('');
  const [presence, setPresence] = useState([]);
  const [presenceToDelete, setToDelete] = useState({});

  const params = useParams();

  useEffect(() => {
    const getWorkoutInfo = async () => {
      const workoutInfoFromServer = await fetchWorkoutInfo();
      setWorkoutInfo(workoutInfoFromServer);
    };
    getWorkoutInfo();

    const getPresence = async () => {
      const presenceFromServer = await FetchPresence();
      setPresence(presenceFromServer);
    };
    getPresence();
  }, []);

  // Fetch Workout Info
  const fetchWorkoutInfo = async () => {
    const res = await fetch(`http://localhost:5000/workouts/${params.id}?_expand=teacher`);
    const data = await res.json();
    setteacherName(data.teacher.name);
    setteacherSurname(data.teacher.surname);
    return data;
  };

  // Fetch presence
  const FetchPresence = async () => {
    const res = await fetch(`http://localhost:5000/presence?workoutId=${params.id}`);
    const data = await res.json();

    return data;
  };

  // Add Presence
  const addPresence = async (client) => {
    const p = {
      workoutId: parseInt(params.id),
      clientId: client.clientId,
    };

    const res = await fetch('http://localhost:5000/presence', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(p),
    });

    const data = await res.json();

    setPresence((prevPresence) => {
      return [...prevPresence, data];
    });
  };

  // Set to delete

  const setToDel = (toDel) => {
    setToDelete(toDel);
  };

  //Delete presence
  const deletePresence = async (presId) => {
    const res = await fetch(`http://localhost:5000/presence/${presId}`, {
      method: 'DELETE',
    });
    //We should control the response status to decide if we will change the state or not.

    // setPresence(presence.filter((pr) => pr.id !== presId));
    // res.status === 200 ? window.location.reload() : alert('Error Deleting This Client');
    res.status === 200 ? setPresence(presence.filter((pr) => pr.id !== presId)) : alert('Error Deleting This Client');
  };

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

        <button className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#addModal">
          Zapisz klienta
        </button>
      </div>
      <AddWorkoutClientModal onAdd={addPresence} />
      <DeletePersonModal onDelete={deletePresence} clientToDelete={presenceToDelete} headerText={'Usunąć klienta?'} />
    </>
  );
};
export default WorkoutsView;
