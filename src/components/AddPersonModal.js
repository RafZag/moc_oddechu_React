import { useState } from 'react';

const AddPersonModal = ({ onAdd, headerText }) => {
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

  const onCancel = () => {
    setName('');
    setSurname('');
    setEmail('');
    setPhone('');
  };

  return (
    <div className="modal fade" id="addModal" tabIndex="-1" aria-labelledby="addModalLabel" aria-hidden="true">
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="addModalLabel">
              {headerText}
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
              <div className="position-relative d-flex align-items-center py-3 modal-footer">
                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={() => onCancel()}>
                  Anuluj
                </button>
                <input type="submit" value="Dodaj" className="btn btn-success" data-bs-dismiss="modal" />
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddPersonModal;
