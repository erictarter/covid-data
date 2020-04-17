import React from 'react';
import './App.css';

import SelectState from './components/layout/SelectState';
import { StatesProvider } from './components/UsStatesContext';
import Header from './components/layout/Header';
import ShowData from './components/layout/ShowData';

function App() {
  return (
    <div className='App'>
      <StatesProvider>
        <div className='container'>
          <Header />
          <SelectState />
          <div className='show-data-container'>
            <ShowData />
          </div>
        </div>
      </StatesProvider>
    </div>
  );
}

export default App;
