import React, { useState, useEffect, createContext } from 'react';

const usStatesContext = createContext();

const StatesProvider = ({ children }) => {
  // state is list of all states in the US
  const [allStates, setAllStates] = useState([]);
  const [selectedUsState, setSelectedUsState] = useState('');

  const fetchCovidStates = async () => {
    const res = await fetch(
      'https://api.covid19api.com/live/country/united-states/status/confirmed'
    );

    const data = await res.json();

    // each state has 5 objects
    const states = [];

    data.map(i => states.push(i.Province));

    const newStatesList = states.filter((a, b) => states.indexOf(a) === b);
    newStatesList.sort();

    newStatesList.splice(8, 2);
    newStatesList.splice(10, 2);
    newStatesList.splice(34, 1);

    // console.log(newStatesList.indexOf('Ohio'));

    setAllStates(newStatesList);
  };

  useEffect(() => {
    fetchCovidStates();
  });

  const value = { allStates, selectedUsState, setSelectedUsState };

  return (
    <usStatesContext.Provider value={value}>
      {children}
    </usStatesContext.Provider>
  );
};

export { usStatesContext, StatesProvider };
