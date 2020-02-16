
import React from 'react';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import PickerScreen from './PickerScreen';

const RootStack = createStackNavigator({
    Picker: PickerScreen
},
{
    initialRouteName: 'Picker',
    defaultNavigationOptions: {
        headerStyle: {
            backgroundColor: '#C70039',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
            fontWeight: 'bold',
        },
    },
}
);

export default createAppContainer(RootStack);