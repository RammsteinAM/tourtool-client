import React from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import './App.css';
import Login from './pages/Login/Login';
import LanguageSelect from './components/LanguageSelect';

function App() {
  return (
    <div className="App">
      <LanguageSelect />
      <Login />
    </div>
  );
}

export default App;
