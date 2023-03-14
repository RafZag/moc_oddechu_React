import logo from '../img/mo_logo.png';
import { useNavigate } from 'react-router-dom';
import React, { useEffect } from 'react';

const Header = ({ title, isAuth }) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuth) {
      navigate('/login');
    }
  });

  return (
    <header className="container position-relative">
      <div className="d-flex align-items-center py-3">
        <a href="/">
          <img className="img-fluid w-75" src={logo} alt="Moc Oddechu" />
        </a>
        <h1 className="align-middle text-secondary fw-light">{title}</h1>
        <div className="position-absolute end-0">
          <button onClick={() => navigate('/')} className="btn btn-secondary mx-2">
            Zajęcia
          </button>
          <button onClick={() => navigate('/clients')} className="btn btn-secondary mx-2">
            Klienci
          </button>
          <button onClick={() => navigate('/teachers')} className="btn btn-secondary mx-2">
            Nauczyciele
          </button>
        </div>
      </div>
    </header>
  );
};
export default Header;
