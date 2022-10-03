import { useState, useEffect } from 'react';

const AddWorkoutModal = ({ onAdd }) => {
  const [teachers, setTeachers] = useState([]);
  const [name, setName] = useState('');
  const [time, setTime] = useState('');
  const [date, setDate] = useState('');
  const [teacherId, setTeacher] = useState(0);

  const weekDays = ['Niedziela', 'Poniedziałek', 'Wtorek', 'Środa', 'Czwartek', 'Piątek', 'Sobota'];

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

  const onSubmit = (e) => {
    // if (!day) {
    //   alert('Podaj dzień!');
    //   return;
    // }

    if (!teacherId) {
      alert('Wybierz nauczyciela');
      return;
    }

    // e.preventDefault();
    const d = new Date(date);
    const timestamp = new Date(`${date}T${time}`).getTime();
    const day = weekDays[d.getDay()];
    console.log(day);

    onAdd({ name, day, timestamp, teacherId });

    setName('');
    setTime('');
    setDate('');
    setTeacher(0);
  };

  const onCancel = () => {
    setName('');
    setTime('');
    setDate('');
    setTeacher(0);
  };

  return (
    <div className="modal fade" id="addModal" tabIndex="-1" aria-labelledby="addModalLabel" aria-hidden="true">
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="addModalLabel">
              Dodaj zajęcia
            </h5>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={() => onCancel()}></button>
          </div>
          <div className="modal-body">
            <form className="mt-4 needs-validation" onSubmit={onSubmit}>
              <div className="mb-3">
                <div className="input-group has-validation">
                  <input
                    required
                    type="text"
                    className="form-control"
                    id="nameInput"
                    placeholder="Nazwa zajęć"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                  <div className="invalid-feedback">Podaj nazwę.</div>
                </div>
              </div>
              {/* <div className="mb-3">
                <div className="input-group has-validation">
                  <input
                    required
                    type="text"
                    className="form-control"
                    id="dayInput"
                    placeholder="Dzień tygodnia"
                    value={day}
                    onChange={(e) => setDay(e.target.value)}
                  />
                  <div className="invalid-feedback">Podaj dzień tygodnia.</div>
                </div>
              </div> */}
              {/* <div className="mb-3">
                <select className="form-select" value={day} onChange={(e) => setDay(e.target.value)} required>
                  <option defaultValue>Wybierz dzień</option>
                  {weekDays.map((day, index) => (
                    <option key={index} value={day}>
                      {day}
                    </option>
                  ))}
                </select>
              </div> */}
              <div className="mb-3">
                <div className="input-group has-validation">
                  <input
                    required
                    type="time"
                    className="form-control"
                    id="timeInput"
                    placeholder="Godzina"
                    value={time}
                    min="09:00"
                    max="20:00"
                    onChange={(e) => setTime(e.target.value)}
                  />
                  <div className="invalid-feedback">Podaj godzinę.</div>
                </div>
              </div>
              <div className="mb-3">
                <div className="input-group has-validation">
                  <input
                    required
                    type="date"
                    className="form-control"
                    id="dateInput"
                    placeholder="Data"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                  />
                  <div className="invalid-feedback">Podaj datę.</div>
                </div>
              </div>
              <div className="mb-3">
                <select className="form-select" value={teacherId} onChange={(e) => setTeacher(parseInt(e.target.value))} required>
                  <option defaultValue>Wybierz nauczyciela</option>
                  {teachers.map((teacher, index) => (
                    <option key={index} value={teacher.id}>
                      {teacher.name} {teacher.surname}
                    </option>
                  ))}
                </select>
              </div>
              <div className="position-relative d-flex align-items-center py-3 modal-footer">
                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={() => onCancel()}>
                  Anuluj
                </button>
                <input type="submit" value="Dodaj" className="btn btn-success" />
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddWorkoutModal;
