import React, { useEffect } from 'react';
import TabNavigation from './src/TabNavigation';
import Reactotron from 'reactotron-react-native';
import { Text, View } from 'react-native';

import { ListProvider, useListContext } from './src/Hooks/List';

Reactotron
.configure({ host: '192.168.1.125' })
.useReactNative() 
.connect()

const Loader = () => {
  const { list } = useListContext();

  if(!list)
  return (
    <View>
      <Text>Loading</Text>
    </View>
  )

  return (
    <TabNavigation />
  )
}

const App = () => {

  useEffect(() => {
    Reactotron.connect();
  }, [])

  return (
    <ListProvider>
      <Loader />
    </ListProvider>
  )
}
    
export default App;