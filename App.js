import React, { useEffect } from 'react';
import TabNavigation from './src/TabNavigation';
import Reactotron, { asyncStorage } from 'reactotron-react-native';
import { StateProvider } from './Store';
import { ListInitialstate, ListReducer } from './src/Stacks/List/Context';

Reactotron
.configure({ host: '192.168.1.125' })
.use(asyncStorage())
.useReactNative() 
.connect()

const initialState = {
  ...ListInitialstate
};

const mainReducer = (state, action) => ({
  ...ListReducer(state, action)
});

const App = () => {

  useEffect(() => {
    Reactotron.connect();
  }, [])

  return (
    <StateProvider initialState={initialState} reducer={mainReducer}>
      <TabNavigation />
    </StateProvider>
  )
}
    
export default App;