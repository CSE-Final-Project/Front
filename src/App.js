import React from 'react';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Router from './router/Router';
import './App.css';

function App() {
  return (
    <div className='App'>
      <Router/>
    </div>
  );
}

export default App;
