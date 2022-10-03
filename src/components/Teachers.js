import { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
import { FaTrashAlt } from 'react-icons/fa';
import DeletePersonModal from './DeletePersonModal';
import AddPersonModal from './AddPersonModal';

const Teachers = ({ onSelect }) => {
  const [teachers, setTeachers] = useState([]);
  const [teacherToDelete, setToDelete] = useState({});

  useEffect(() => {
    const getTeachers = async () => {
      const teachersFromServer = await fetchTeachers();
      setTeachers(teachersFromServer);
    };

    getTeachers();
  }, []);

  // Fetch Teachers
  const fetchTeachers = async () => {
    const res = await fetch('http://localhost:5000/teachers');
    const data = await res.json();

    return data;
  };

  //Delete Teacher
  const deleteTeacher = async (id) => {
    const res = await fetch(`http://localhost:5000/teachers/${id}`, {
      method: 'DELETE',
    });
    //We should control the response status to decide if we will change the state or not.
    res.status === 200 ? setTeachers(teachers.filter((client) => client.id !== id)) : alert('Error Deleting This Teacher');
  };

  // Add Client
  const addTeacher = async (client) => {
    const res = await fetch('http://localhost:5000/teachers', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(client),
    });

    const data = await res.json();

    setTeachers((prevTeachers) => {
      return [...prevTeachers, data];
    });
  };

  // const navigate = useNavigate();

  return (
    <>
      <div className="rounded bg-white p-3 mb-4 shadow-sm">
        <table className="table table-hover">
          <thead>
            <tr>
              <th scope="col">Imię i Nazwisko</th>
              <th scope="col">e-mail</th>
              <th scope="col">Telefon</th>
              <th scope="col">Usuń</th>
            </tr>
          </thead>
          <tbody>
            {teachers.map((teacher) => (
              <tr key={teacher.id}>
                <td onClick={() => onSelect(teacher.name)}>
                  <strong className="text-primary">
                    {teacher.name} {teacher.surname}
                  </strong>
                </td>
                <td>{teacher.email}</td>
                <td>{teacher.phone}</td>
                <td>
                  <FaTrashAlt
                    style={{ color: 'red', cursor: 'pointer' }}
                    data-bs-toggle="modal"
                    data-bs-target="#deleteModal"
                    onClick={() => {
                      setToDelete(teacher);
                    }}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#addModal">
          Dodaj nauczyciela
        </button>
      </div>

      <AddPersonModal onAdd={addTeacher} headerText={'Dodaj nowego nauczyciela'} />
      <DeletePersonModal onDelete={deleteTeacher} clientToDelete={teacherToDelete} headerText={'Usunąć nauczyciela?'} />
    </>
  );
};

export default Teachers;
