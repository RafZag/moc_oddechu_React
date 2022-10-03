import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { getDatabase, ref, set, get } from 'firebase/database';

import Header from './components/Header';
import Footer from './components/Footer';
import Workouts from './components/Workouts';
import Teachers from './components/Teachers';
import Clients from './components/Clients';
import WorkoutsView from './components/WorkoutView';
import database from './firebase-config';

import './App.css';

function App() {
  const onSelect = (name) => {
    console.log(name);
  };

  return (
    <Router>
      <div className="container">
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Header title={'Lista zajęć'} />
                <Workouts onSelect={onSelect} />
              </>
            }
          />
          <Route
            path="/teachers"
            element={
              <>
                <Header title={'Lista nauczycieli'} />
                <Teachers onSelect={onSelect} />
              </>
            }
          />
          <Route
            path="/clients"
            element={
              <>
                <Header title={'Lista klientów'} />
                <Clients onSelect={onSelect} />
              </>
            }
          />
          <Route
            path="/workout/:id"
            element={
              <>
                <Header title={'Zajęcia'} />
                <WorkoutsView onSelect={onSelect} />
              </>
            }
          />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
