import React, { useEffect } from 'react';
import TabNavigation from './src/TabNavigation';
import Reactotron from 'reactotron-react-native';
import { StyleSheet, ActivityIndicator, View } from 'react-native';

import { ListProvider, useListContext } from './src/Hooks/List';
import { ProfilesProvider, useProfilesContext } from './src/Hooks/Profiles';

Reactotron
.configure({ host: '192.168.1.125' })
.useReactNative() 
.connect()

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  horizontal: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
  },
});

const Loader = () => {
  const { profiles } = useProfilesContext();
  const { list } = useListContext();

  if(!list && !profiles)
  return (
    <View style={[styles.container, styles.horizontal]}>
      <ActivityIndicator size={100} color="#C70039" />
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
    <ProfilesProvider>
    <ListProvider>
      <Loader />
    </ListProvider>
    </ProfilesProvider>
  )
}
    
export default App;