import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import WorkoutClient from './WorkoutClient';

const WorkoutsView = (props) => {
  const [workoutInfo, setWorkoutInfo] = useState({});
  const [teacherName, setteacherName] = useState('');
  const [teacherSurname, setteacherSurname] = useState('');
  const [presence, setPresence] = useState([]);
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

  return (
    <>
      <div className="rounded bg-white p-3 mb-4 shadow-sm">
        <div className="container mb-4">
          <h3>
            {workoutInfo.name}
            <span className="fw-light">
              {' - '} {teacherName} {teacherSurname} {workoutInfo.day} {workoutInfo.date}
            </span>
          </h3>
        </div>

        <div className="container mb-4">
          <h5>Lista zapisanych klientów:</h5>
        </div>
        <table className="table table-hover mt-4">
          <thead>
            <tr>
              <th scope="col">Imię i Nazwisko</th>
              <th scope="col">e-mail</th>
              <th scope="col">Telefon</th>
              <th scope="col">Usuń</th>
            </tr>
          </thead>
          <tbody>
            {presence.map((pres, index) => (
              <tr key={index}>
                <WorkoutClient id={pres.clientId} />
              </tr>
            ))}
          </tbody>
        </table>
        <ul></ul>
      </div>
    </>
  );
};
export default WorkoutsView;
