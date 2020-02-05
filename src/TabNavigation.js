import React, { useEffect, useState } from 'react';
import { useStore } from '../Store';
import { Ionicons } from '@expo/vector-icons'; // 6.2.2
import { createAppContainer } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { ScrollView, Text } from 'react-native';
import ListStack from './Stacks/List';
import PickerStack from './Stacks/Picker';
import { loadListData } from './Stacks/List/Context';

const TabNavigator = createBottomTabNavigator({
    Picker: PickerStack,
    List: ListStack
  },
  {
    defaultNavigationOptions: ({ navigation }) => ({
        tabBarIcon: ({ focused, horizontal, tintColor }) => {
            const { routeName } = navigation.state;
            let IconComponent = Ionicons;
            let iconName;

            (routeName === 'List') && ( iconName = 'ios-list');
            (routeName === 'Picker') && ( iconName = 'ios-navigate');
            
            return <IconComponent name={iconName} size={25} color={tintColor} />;
          }
    }),
    tabBarOptions: {
      activeTintColor: '#C70039',
      inactiveTintColor: 'gray',
    },
  }
);

const AppContainer = createAppContainer(TabNavigator);

const App = () => {

    const [store, dispatch] = useStore();
    const [isLoading, setLoading] = useState(true);

    useEffect(() => {
     Promise.all([loadListData(dispatch)])
     .then(() => setLoading(false))
    }, [])

    if(isLoading)
      return (
        <ScrollView>
          <Text>Loading Data</Text>
        </ScrollView>
      );

    return (
      <AppContainer />
    );
}
  
export default App;