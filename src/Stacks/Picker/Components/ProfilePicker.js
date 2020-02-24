import React, { useState } from 'react';
import { ListItem, Icon, Text } from 'react-native-elements';
import { View, ScrollView } from 'react-native';

import { useProfilesContext } from '../../../Hooks/Profiles';

const ProfilePicker = () => {
    
    const [isCollapsed, setState] = useState(false);
    const { selectedProfile, profiles, dispatchProfiles } = useProfilesContext();

    const changeactiveProfile = selectedProfileId => {
        dispatchProfiles({
            type: 'updateSelectedProfile',
            data: selectedProfileId
        })
        setState(false)
    }

    if(!selectedProfile) return (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <Text style={{ fontSize: 20, fontFamily: 'sans-serif-thin' }}>No Available Profiles</Text>
            <Text style={{ marginTop: 10, fontSize: 15, fontFamily: 'sans-serif-thin' }}>{'- Go to the profile menu and create some profiles -'}</Text>
        </View>
    )

    return (
        <View style={{flex: 0, maxHeight: '50%'}}>
            <ListItem 
                title='Selected Profile' bottomDivider
                subtitle={profiles.find(p => p.id === selectedProfile).name} 
                onPress={() => profiles.length > 1 && setState(state => !state)} 
                rightIcon={profiles.length > 1 ? <Icon name={`keyboard-arrow-${isCollapsed ? 'up' : 'down'}`} /> : null}
            />
            <ScrollView style={{display: isCollapsed ? 'flex' : 'none' }}>
                { profiles.filter(p => p.id !== selectedProfile).map((p, i) => <ListItem key={i} title={p.name} bottomDivider onPress={() => changeactiveProfile(p.id)} />) }
            </ScrollView>
        </View>
    )
}
    
export default ProfilePicker;
    