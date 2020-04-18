import React, { useContext, useEffect, useState } from 'react';
import { usStatesContext } from '../UsStatesContext';
// import SelectState from './SelectState';

const ShowData = () => {
  // state will contain object of most current data from US state selected

  const [stateData, setStateData] = useState('');

  const { selectedUsState } = useContext(usStatesContext);

  // use effect will call this function to fetch data

  const fetchCovidStates = async () => {
    const res = await fetch(
      'https://api.covid19api.com/live/country/united-states/status/confirmed'
    );

    const data = await res.json();

    // from all usa data. filter through and create new array with data from only that state

    const newData = data.filter(i => i.Province === `${selectedUsState}`);

    // current data var gets the last object in array which is the most current

    const currentData = newData[newData.length - 1];

    setStateData(currentData);
  };

  // the button calls a function to display current cases and deaths for that US State

  const show = () => {
    let confirmed = stateData.Confirmed;
    let deaths = stateData.Deaths;
    const data = document.getElementById('state-data');

    data.innerHTML = ` 
    <i class="fas fa-virus sick"></i> Confirmed Cases: ${confirmed} <br/><i class="fas fa-skull-crossbones dead"></i> Deaths: ${deaths}`;
  };

  // fetches data

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
