import { useState, useEffect } from 'react';
import { db } from '../firebase-config';
import { FaTrashAlt } from 'react-icons/fa';
import { collection, getDocs, addDoc, deleteDoc, doc, getDoc, query, where } from 'firebase/firestore';

const WorkoutsDetails = ({ workout }) => {
  const [teacherInfo, setTeacherInfo] = useState('');
  const [presenceCount, setPresenceCount] = useState(0);
  const [workoutToDelete, setWorkoutToDelete] = useState({});
  const presenceCollectionRef = collection(db, 'presence');

  useEffect(() => {
    getTeacherInfo();
    getPresenceCount(workout.id);
  }, []);

  const getTeacherInfo = async () => {
    const teacherDoc = doc(db, 'teachers', workout.teacherId);
    const docSnap = await getDoc(teacherDoc);

    const data = docSnap.exists() ? docSnap.data() : null;
    // const newInfo = { ...data, timestamp: data.timestamp.toMillis() };
    setTeacherInfo(data);
  };

  const getPresenceCount = async (id) => {
    const q = query(presenceCollectionRef, where('workoutId', '==', id));
    const querySnapshot = await getDocs(q);
    // querySnapshot.forEach((doc) => {
    //   // doc.data() is never undefined for query doc snapshots
    //   console.log(doc.data());
    //   setPresenceCount(presenceCount + 1);
    // });
    setPresenceCount(querySnapshot.size);
  };

  // useEffect(() => {
  //   const getPresence = async () => {
  //     const presenceFromServer = await FetchPresence();
  //     setPresence(presenceFromServer);
  //   };
  //   getPresence();
  // }, []);

  // // Fetch presence
  // const FetchPresence = async () => {
  //   const res = await fetch(`http://localhost:5000/workouts/${workout.id}?_embed=presence`);
  //   const data = await res.json();
  //   return data.presence.length;
  // };

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
        {teacherInfo.name} {teacherInfo.surname}
      </td>
      <td>
        <span className="badge bg-secondary">{presenceCount}</span>
      </td>
    </>
  );
};

export default WorkoutsDetails;
