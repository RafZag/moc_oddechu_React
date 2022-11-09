const Footer = ({ onLogout, user, isAuth }) => {
  return (
    <footer className="text-center">
      <p className="text-muted" style={{ fontSize: 14 }}>
        Moc Oddechu - klub Jogi i Pilates | Zalogowano: <b>{user && user.email}</b> |{' '}
        <a href="#" className="text-decoration-none" onClick={onLogout}>
          Wyloguj
        </a>
      </p>
    </footer>
  );
};

export default Footer;
