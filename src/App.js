import React from 'react';
import AppContainer from './components/AppContainer';
import { BrowserRouter, Route } from "react-router-dom";


function App() {
  return (
    <BrowserRouter>
      <Route path='/' component={AppContainer} />
    </BrowserRouter>
  );
}

export default App;
