import React, { useContext, useState } from 'react';
import { usStatesContext } from '../UsStatesContext';

const SelectState = () => {
  const { allStates, selectedUsState, setSelectedUsState } = useContext(
    usStatesContext
  );

  const setUsState = e => {
    setSelectedUsState(e.target.value);
    console.log(selectedUsState);
  };

  return (
    <div>
      <form action=''>
        <label htmlFor='states'></label>
        <select id='states' name='US States' onChange={setUsState}>
          <option selected>Select State</option>
          {allStates.map(state => (
            <option key={state} value={state}>
              {state}
            </option>
          ))}
        </select>
      </form>
    </div>
  );
};

export default SelectState;
