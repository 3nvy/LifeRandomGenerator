
import React from 'react';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import ListScreen from './ListScreen';
import AddListItemScreen from './AddListItemScreen';
import ItemDetailsScreen from './ItemDetailsScreen';

const RootStack = createStackNavigator({
    List: ListScreen,
    AddListItem: AddListItemScreen,
    ItemDetails: ItemDetailsScreen
},
{
    initialRouteName: 'List',
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