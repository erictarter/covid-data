import React, { useState, useEffect, createContext } from 'react';

const usStatesContext = createContext();

const StatesProvider = ({ children }) => {
  // state will be a list of all states in the US

  const [allStates, setAllStates] = useState([]);
  const [selectedUsState, setSelectedUsState] = useState('');

  // this function will fetch data.. is called by use effect hook

  const fetchCovidStates = async () => {
    const res = await fetch(
      'https://api.covid19api.com/live/country/united-states/status/confirmed'
    );

    const data = await res.json();

    const states = [];

    // fill empty states array with strings of all US States

    data.map(i => states.push(i.Province));

    // get rid of duplicate USStates

    const newStatesList = states.filter((a, b) => states.indexOf(a) === b);
    newStatesList.sort();

    // remove strings that are not US States

    newStatesList.splice(8, 2);
    newStatesList.splice(10, 2);
    newStatesList.splice(34, 1);

    // setAllStates

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
