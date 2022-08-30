import { useState, useEffect } from 'react';

const WorkoutsDetails = ({ workout }) => {
  const [workoutPresence, setPresence] = useState(0);

  useEffect(() => {
    const getPresence = async () => {
      const presenceFromServer = await FetchPresence();
      setPresence(presenceFromServer);
    };
    getPresence();
  });

  // Fetch presence
  const FetchPresence = async () => {
    const res = await fetch(`http://localhost:5000/workouts/${workout.id}?_embed=presence`);
    const data = await res.json();
    return data.presence.length;
  };

  return (
    <>
      <td>
        <strong className="text-primary">{workout.name}</strong>
      </td>
      <td>{workout.day}</td>
      <td>{workout.time}</td>
      <td>{workout.date}</td>
      <td>
        {workout.teacher.name} {workout.teacher.surname}
      </td>
      <td>{workoutPresence}</td>
    </>
  );
};

export default WorkoutsDetails;
