import React from 'react';
import { InputForm } from '../components/home';

const Home = () => {
  return (
    <>
      <InputForm />
      <div className="box__monthly" />
      <div className="box__todo" />
      <div className="box__monthlyexpense" />
    </>
  );
};
export default Home;
