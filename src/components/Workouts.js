import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import WorkoutsDetails from './WorkoutDetails';
import AddWorkoutModal from './AddWorkoutModal';

const Workouts = ({ onSelect }) => {
  const [workouts, setWorkouts] = useState([]);

  useEffect(() => {
    const getWorkouts = async () => {
      const workoutsFromServer = await fetchWorkouts();
      setWorkouts(workoutsFromServer);
      // workouts.sort((a, b) => {
      //   return a - b;
      // });
    };
    getWorkouts();
  }, []);

  // Fetch Workouts
  const fetchWorkouts = async () => {
    const res = await fetch('http://localhost:5000/workouts?_expand=teacher');
    const data = await res.json();
    data.sort((a, b) => {
      return a.timestamp - b.timestamp;
    });
    // console.log(data);
    return data;
  };

  // Add Workout
  const addWorkout = async (workout) => {
    const res = await fetch('http://localhost:5000/workouts', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(workout),
    });

    const data = await res.json();

    setWorkouts((prevWorkouts) => {
      return [...prevWorkouts, data];
    });
  };

  const navigate = useNavigate();

  return (
    <>
      <div className="rounded bg-white p-3 shadow-sm">
        <table className="table table-hover mb-4">
          <thead>
            <tr>
              <th scope="col">Nazwa zajęć</th>
              <th scope="col">Dzień</th>
              <th scope="col">Godzina</th>
              <th scope="col">Data</th>
              <th scope="col">Nauczyciel</th>
              <th scope="col">Zapisanych</th>
            </tr>
          </thead>
          <tbody>
            {workouts.map((workout, index) => (
              <tr key={index} style={{ cursor: 'pointer' }} onClick={() => navigate(`/workout/${workout.id}`)}>
                <WorkoutsDetails workout={workout} />
              </tr>
            ))}
          </tbody>
        </table>
        <button className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#addModal">
          Dodaj zajęcia
        </button>
      </div>
      <div className="position-relative d-flex align-items-center py-3"></div>
      <AddWorkoutModal onAdd={addWorkout} />
    </>
  );
};

export default Workouts;
