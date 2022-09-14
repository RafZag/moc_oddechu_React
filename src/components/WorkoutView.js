import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const WorkoutsView = (props) => {
  const [workoutInfo, setWorkoutInfo] = useState({});
  const params = useParams();

  useEffect(() => {
    const getWorkoutInfo = async () => {
      const workoutInfoFromServer = await fetchWorkoutInfo();
      setWorkoutInfo(workoutInfoFromServer);
    };
    getWorkoutInfo();
  });

  // Fetch Workout Info
  const fetchWorkoutInfo = async () => {
    const res = await fetch(`http://localhost:5000/workouts/${params.id}?_expand=teacher`);
    const data = await res.json();
    return data;
  };

  return (
    <>
      <div className="rounded bg-white p-3 mb-4 shadow-sm">
        <h3>
          {workoutInfo.name} {workoutInfo.day} {workoutInfo.date}
        </h3>
      </div>
    </>
  );
};
export default WorkoutsView;
