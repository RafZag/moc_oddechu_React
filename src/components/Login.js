import logo from '../img/mo_logo.png';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase-config';

const Login = ({ setIsAuth, setCurrentUser }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  let navigate = useNavigate();

  const onLogin = async (loginEmail, loginPassword) => {
    try {
      const user = await signInWithEmailAndPassword(auth, loginEmail, loginPassword);
      localStorage.setItem('isAuth', true);
      setCurrentUser(user);
      setIsAuth(true);
      navigate('/');
    } catch (error) {
      console.log(error.message);
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();
    setEmail('');
    setPassword('');
    onLogin(email, password);
  };

  return (
    <>
      <div className="position-relative">
        <div className="position-absolute top-50 start-50 translate-middle-x text-center">
          <img src={logo} alt="Moc Oddechu" />
          <h5 className="mt-4 text-secondary">Logowanie </h5>
          <form className="mt-4 needs-validation" onSubmit={onSubmit}>
            <div className="mb-3">
              <div className="input-group has-validation">
                <input
                  required
                  type="email"
                  className="form-control"
                  id="mailInput"
                  placeholder="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <div className="invalid-feedback">Podaj imię.</div>
              </div>
            </div>
            <div className="mb-3">
              <div className="input-group has-validation">
                <input
                  required
                  type="password"
                  className="form-control"
                  id="passwordInput"
                  placeholder="hasło"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <div className="invalid-feedback">Podaj hasło.</div>
              </div>
            </div>
            <input type="submit" value="Zaloguj" className="btn btn-primary" />
          </form>
        </div>
      </div>
    </>
  );
};
export default Login;
