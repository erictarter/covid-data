import React, { useContext, useEffect, useState } from 'react';
import { usStatesContext } from '../UsStatesContext';
// import SelectState from './SelectState';

const ShowData = () => {
  const [stateData, setStateData] = useState('');

  const { allStates, selectedUsState, setSelectedUsState } = useContext(
    usStatesContext
  );

  const fetchCovidStates = async () => {
    const res = await fetch(
      'https://api.covid19api.com/live/country/united-states/status/confirmed'
    );

    const data = await res.json();

    const newData = data.filter(i => i.Province === `${selectedUsState}`);
    const currentData = newData[newData.length - 1];

    setStateData(currentData);
  };

  const show = () => {
    let confirmed = stateData.Confirmed;
    let deaths = stateData.Deaths;
    const data = document.getElementById('state-data');

    data.innerHTML = ` 
    <i class="fas fa-virus sick"></i> Confirmed Cases: ${confirmed} <br/><i class="fas fa-skull-crossbones dead"></i> Deaths: ${deaths}`;
  };

  useEffect(() => {
    fetchCovidStates();
  });

  return (
    <div>
      {/* <h1>{selectedUsState}</h1> */}
      <div className='show-data'>
        {selectedUsState ? (
          <button onClick={show} className='show-data-btn'>
            Show Data for {selectedUsState}
          </button>
        ) : null}
      </div>
      <div className='state-data' id='state-data'></div>
    </div>
  );
};

export default ShowData;
