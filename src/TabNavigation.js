import React from 'react';
import { Ionicons } from '@expo/vector-icons'; // 6.2.2
import { createAppContainer } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import ListStack from './Stacks/List';

const TabNavigator = createBottomTabNavigator({
    List: ListStack,
  },
  {
    defaultNavigationOptions: ({ navigation }) => ({
        tabBarIcon: ({ focused, horizontal, tintColor }) => {
            const { routeName } = navigation.state;
            let IconComponent = Ionicons;
            let iconName;
            if (routeName === 'List') {
              iconName = focused
                ? 'ios-list'
                : 'ios-list';
            }
            
            return <IconComponent name={iconName} size={25} color={tintColor} />;
          },
    }),
    tabBarOptions: {
      activeTintColor: '#C70039',
      inactiveTintColor: 'gray',
    },
  });
  
  export default createAppContainer(TabNavigator);