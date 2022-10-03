import { useState, useEffect } from 'react';

const WorkoutsDetails = ({ workout }) => {
  const [workoutPresence, setPresence] = useState(0);

  useEffect(() => {
    const getPresence = async () => {
      const presenceFromServer = await FetchPresence();
      setPresence(presenceFromServer);
    };
    getPresence();
  }, []);

  // Fetch presence
  const FetchPresence = async () => {
    const res = await fetch(`http://localhost:5000/workouts/${workout.id}?_embed=presence`);
    const data = await res.json();
    return data.presence.length;
  };

  const time = new Date(workout.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  const date = new Date(workout.timestamp).toLocaleDateString();

  return (
    <>
      <td>
        <strong className="text-primary">{workout.name}</strong>
      </td>
      <td>{workout.day}</td>
      <td>{time}</td>
      <td>{date}</td>
      <td>
        {workout.teacher.name} {workout.teacher.surname}
      </td>
      <td>
        <span className="badge bg-secondary">{workoutPresence}</span>
      </td>
    </>
  );
};

export default WorkoutsDetails;
