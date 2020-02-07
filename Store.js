import React, { createContext, useContext, useReducer, useEffect, useState } from 'react';
import { ScrollView, Text } from 'react-native';
import { ListReducer, ListLoader } from './src/Stacks/List/Context';

// Create global context
const StateContext = createContext();
const useStore = () => useContext(StateContext);

// Spreading reducers for each individual context
const globalReducer = (state, action) => ({
  ...ListReducer(state, action)
});

// State loader to fetch initial state of each context from the localstorage
const StateLoader = ({ children }) => {
  const [globalInitialState, setGlobalState] = useState();

  // Load data from localstorage
  useEffect(() => {
    Promise.all([ListLoader()])
     .then((list) => {
        setGlobalState({ list: list[0] });
     })
  }, [])

  // Loading screen while store is empty
  if(!globalInitialState)
    return (
      <ScrollView>
        <Text>Loadig Data</Text>
      </ScrollView>
    )

  return <StateProvider globalInitialState={globalInitialState} children={children}/>
}

// State provider to wrap on the App
const StateProvider = ({ children, globalInitialState }) => (
  <StateContext.Provider value={useReducer(globalReducer, globalInitialState)}>
    {children}
  </StateContext.Provider>
);

export {
  StateContext, 
  StateLoader,
  useStore
}