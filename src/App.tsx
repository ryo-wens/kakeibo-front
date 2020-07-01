import React from 'react';
import './assets/style.css';
import { TextInput } from './components/index';
import Router from './Router';

const App = () => {
  return (
    <section className="section__display">
      <div className="box__input box-right">
        <h3>入力フォーム</h3>
        <TextInput />
      </div>
      <Router />
    </section>
  );
};

export default App;
