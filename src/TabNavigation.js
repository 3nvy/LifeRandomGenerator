import React from 'react';
import { Ionicons } from '@expo/vector-icons'; // 6.2.2
import { createAppContainer } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import ListStack from './Stacks/List';
import PickerStack from './Stacks/Picker';

const TabNavigator = createBottomTabNavigator({
    Picker: PickerStack,
    List: ListStack
  },
  {
    defaultNavigationOptions: ({ navigation }) => ({
        tabBarIcon: ({ tintColor }) => {
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

export default createAppContainer(TabNavigator);