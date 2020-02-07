import React, { useEffect } from 'react';
import TabNavigation from './src/TabNavigation';
import Reactotron from 'reactotron-react-native';

import { StateLoader } from './Store';

Reactotron
.configure({ host: '192.168.1.125' })
.useReactNative() 
.connect()

const App = () => {

  useEffect(() => {
    Reactotron.connect();
  }, [])

  return (
    <StateLoader>
      <TabNavigation />
    </StateLoader>
  )
}
    
export default App;