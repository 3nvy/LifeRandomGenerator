
import React from 'react';
import { createStackNavigator } from 'react-navigation-stack';
import ProfilesScreen from './ProfilesScreen';
import AddProfileScreen from './AddProfileScreen';
import ProfileDetailsScreen from '../List/ProfileDetailsScreen';
import AddOptionScreen from '../List/AddOptionScreen';
import OptionDetailsScreen from '../List/OptionDetailsScreen';

const RootStack = createStackNavigator({
    Profiles: ProfilesScreen,
    AddProfile: AddProfileScreen,
    ProfileDetails: ProfileDetailsScreen,
    AddOption: AddOptionScreen,
    OptionDetails: OptionDetailsScreen
},
{
    initialRouteName: 'Profiles',
    defaultNavigationOptions: {
        headerStyle: {
            backgroundColor: '#C70039',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
            fontWeight: 'bold',
        }
    },
}
);

RootStack.navigationOptions = ({ navigation }) => ({
    tabBarVisible: !['AddListItem'].includes(navigation.state.routes[navigation.state.index].routeName)
});

const previousGetActionForPathAndParams = RootStack.router.getStateForAction;
Object.assign(RootStack.router, { 
    getStateForAction: (action, state) => {

        if (
          state &&
          ['Navigation/POP', 'Navigation/BACK'].includes(action.type) &&
          state.routes[state.index].routeName === 'AddListItem' && 
          (state.routes[state.index].params || {}).canNavigateAway !== true
        ) {
            const newAction = {
                key: state.routes[state.index].key,
                params: { showPrompt: true },
                preserveFocus: true,
                type: "Navigation/SET_PARAMS",
            }
            return previousGetActionForPathAndParams(newAction, state);
        }
      
        return previousGetActionForPathAndParams(action, state);
    }
})

export default RootStack;