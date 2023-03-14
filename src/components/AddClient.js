import { useState } from 'react';

const AddClient = ({ onAdd }) => {
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  const onSubmit = (e) => {
    // if (!name || surname || email || phone) {
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
      <h5>Dodaj nowego klienta</h5>
      <form className="w-50 mt-4 needs-validation" onSubmit={onSubmit}>
        <div className="mb-3">
          <div className="input-group has-validation">
            <input
              required
              type="text"
              className="form-control"
              id="nameInput"
              placeholder="Imię"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <div className="invalid-feedback">Podaj imię.</div>
          </div>
        </div>
        <div className="mb-3">
          <div className="input-group has-validation">
            <input
              required
              type="text"
              className="form-control"
              id="surnameInput"
              placeholder="Nazwisko"
              value={surname}
              onChange={(e) => setSurname(e.target.value)}
            />
            <div className="invalid-feedback">Podaj nazwisko.</div>
          </div>
        </div>
        <div className="mb-3">
          <div className="input-group has-validation">
            <input
              required
              type="email"
              className="form-control"
              id="emailInput"
              placeholder="Adres e-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <div className="invalid-feedback">Podaj e-mail.</div>
          </div>
        </div>
        <div className="mb-3">
          <div className="input-group has-validation">
            <input
              required
              type="phone"
              className="form-control"
              id="phoneInput"
              placeholder="Telefon"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
            <div className="invalid-feedback">Podaj telefon.</div>
          </div>
        </div>
        <div className="position-relative d-flex align-items-center py-3">
          <input type="submit" value="Dodaj klienta" className="btn btn-success" />
        </div>
      </form>
    </div>
  );
};

export default AddClient;
