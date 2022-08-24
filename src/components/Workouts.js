import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Workouts = ({ onSelect }) => {
  const [workouts, setWorkouts] = useState([]);

  useEffect(() => {
    const getWorkouts = async () => {
      const workoutsFromServer = await fetchWorkouts();
      setWorkouts(workoutsFromServer);
    };
    getWorkouts();
  }, []);

  // Fetch Workouts
  const fetchWorkouts = async () => {
    const res = await fetch('http://localhost:5000/workouts?_expand=teacher');
    const data = await res.json();

    return data;
  };

  const navigate = useNavigate();

  return (
    <>
      <div className="rounded bg-white p-3 mb-4">
        <table className="table table-hover">
          <thead>
            <tr>
              <th scope="col">Nazwa zajęć</th>
              <th scope="col">Dzień</th>
              <th scope="col">Godzina</th>
              <th scope="col">Data</th>
              <th scope="col">Nauczyciel</th>
            </tr>
          </thead>
          <tbody>
            {workouts.map((workout, index) => (
              <tr key={index} style={{ cursor: 'pointer' }} onClick={() => onSelect(workout.name)}>
                <td>
                  <strong className="text-primary">{workout.name}</strong>
                </td>
                <td>{workout.day}</td>
                <td>{workout.time}</td>
                <td>{workout.date}</td>
                <td>
                  {workout.teacher.name} {workout.teacher.surname}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="position-relative d-flex align-items-center py-3">
        <button onClick={() => navigate('/')} className="btn btn-success">
          Dodaj zajęcia
        </button>
        <div className="position-absolute end-0">
          <button onClick={() => navigate('/clients')} className="btn btn-outline-secondary ">
            Klienci
          </button>
          <button onClick={() => navigate('/teachers')} className="btn btn-outline-secondary mx-2">
            Nauczyciele
          </button>
        </div>
      </div>
    </>
  );
};

export default Workouts;
