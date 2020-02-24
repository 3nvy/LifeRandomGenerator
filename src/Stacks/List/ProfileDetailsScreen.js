import React, { useState, useEffect } from 'react';
import List from './Components/List';
import { View } from 'react-native';
import { Icon } from 'react-native-elements';
import { useProfilesContext } from '../../Hooks/Profiles';

const ListScreen = ({ navigation }) => {

    const { profileId } = navigation.state.params;
    const { dispatchProfiles } = useProfilesContext();

    const removeProfile = () => {
        dispatchProfiles({
            type: 'remove',
            data: profileId
        })
        navigation.navigate('Profiles');
    }

    useEffect(() => {
        navigation.setParams({ removeProfile });
    }, [])

    return (
        <View>
            <List 
                navigation={navigation}
                filterFn={i => i.profileId === profileId}
                isProfileGroup={true}
                parentId={profileId}
            />
        </View>
    )
}

ListScreen.navigationOptions = ({ navigation }) => {
    const { removeProfile } = navigation.state.params || {};

    return {
        title: 'Profile Details',
        headerRight: () => (
           <View style={{flexDirection: 'row'}}>
            <Icon 
                name='clear' 
                color='white'
                underlayColor='#C70039'
                iconStyle={{marginLeft: 10, marginRight: 10}}
                onPress={() => removeProfile()}
            />
           </View>
        )
      }
}

        
export default ListScreen;