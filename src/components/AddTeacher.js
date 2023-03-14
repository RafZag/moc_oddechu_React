import { useState } from 'react';

const AddTeacher = ({ onAdd }) => {
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  const onSubmit = (e) => {
    // if (!name || !surname || !email || !phone) {
    //   alert('Podaj wszystkie dane');
    //   return;
    // }

    e.preventDefault();
    setName('');
    setSurname('');
    setEmail('');
    setPhone('');

    onAdd({ name, surname, email, phone });
  };

  return (
    <div className="container mb-6">
      <h5>Dodaj nowego nauczyciela</h5>
      <form className="w-50 mt-4" onSubmit={onSubmit}>
        <div className="mb-3">
          <label htmlFor="nameInput" className="visually-hidden">
            Name
          </label>
          <input
            required
            type="text"
            className="form-control"
            id="nameInput"
            placeholder="Imię"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="surnameInput" className="visually-hidden">
            Surname
          </label>
          <input
            required
            type="text"
            className="form-control"
            id="surnameInput"
            placeholder="Nazwisko"
            value={surname}
            onChange={(e) => setSurname(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="emailInput" className="visually-hidden">
            Email
          </label>
          <input
            required
            type="email"
            className="form-control"
            id="emailInput"
            placeholder="Adres e-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="phoneInput" className="visually-hidden">
            Phone
          </label>
          <input
            required
            type="phone"
            className="form-control"
            id="phoneInput"
            placeholder="Telefon"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>
        <div className="position-relative d-flex align-items-center py-3">
          <input type="submit" value="Dodaj nauczyciela" className="btn btn-success" />
        </div>
      </form>
    </div>
  );
};

export default AddTeacher;
