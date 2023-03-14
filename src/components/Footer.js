import { auth } from '../firebase-config';
import { signOut } from 'firebase/auth';

const Footer = ({ user, setIsAuth }) => {
  const logout = async () => {
    await signOut(auth);
    // localStorage.clear();
    localStorage.setItem('isAuth', false);
    setIsAuth(false);
    window.location.pathname = '/';
  };

  return (
    <footer className="text-center">
      <p className="text-muted" style={{ fontSize: 14 }}>
        <b>Moc Oddechu</b> - klub Jogi i Pilates | Zalogowano: <b>{user && user.email}</b> |{' '}
        <a href="#" className="text-decoration-none" onClick={logout}>
          Wyloguj
        </a>
      </p>
    </footer>
  );
};

export default Footer;
