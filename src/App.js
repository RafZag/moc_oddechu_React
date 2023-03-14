import { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase-config';

import Header from './components/Header';
import Footer from './components/Footer';
import Workouts from './components/Workouts';
import Teachers from './components/Teachers';
import Clients from './components/Clients';
import WorkoutsView from './components/WorkoutView';
import Login from './components/Login';

import './App.css';

function App() {
  const [currentUser, setCurrentUser] = useState({});
  const [isAuth, setIsAuth] = useState(localStorage.getItem('isAuth'));

  onAuthStateChanged(auth, (user) => {
    setCurrentUser(user);
    user && Object.keys(user).length !== 0 ? setIsAuth(true) : setIsAuth(false);
  });

  const onSelect = (name) => {
    console.log(name);
  };

  return (
    <Router>
      <div className="container position-relative">
        <Routes>
          <Route
            path="/login"
            element={
              <>
                <Login setIsAuth={setIsAuth} setCurrentUser={setCurrentUser} />
              </>
            }
          />
          <Route
            path="/"
            element={
              <>
                <Header title={'Lista zajęć'} isAuth={isAuth} />
                <Workouts onSelect={onSelect} />
                <Footer user={currentUser} setIsAuth={setIsAuth} />
              </>
            }
          />
          <Route
            path="/teachers"
            element={
              <>
                <Header title={'Lista nauczycieli'} isAuth={isAuth} />
                <Teachers onSelect={onSelect} />
                <Footer user={currentUser} setIsAuth={setIsAuth} />
              </>
            }
          />
          <Route
            path="/clients"
            element={
              <>
                <Header title={'Lista klientów'} isAuth={isAuth} />
                <Clients onSelect={onSelect} />
                <Footer user={currentUser} setIsAuth={setIsAuth} />
              </>
            }
          />
          <Route
            path="/workout/:id"
            element={
              <>
                <Header title={'Zajęcia'} isAuth={isAuth} />
                <WorkoutsView onSelect={onSelect} />
                <Footer user={currentUser} setIsAuth={setIsAuth} />
              </>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
