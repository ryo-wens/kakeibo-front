import React from 'react';
import './assets/style.css';
import { Header } from './components/header';
import Router from './Router';

const App = () => {
  return (
    <>
      <Header />
      <main className="section__display">
        <Router />
      </main>
    </>
  );
};
export default App;
