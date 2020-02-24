import React from 'react';
import { ScrollView , Text, TouchableHighlight } from 'react-native';
import { ListItem } from 'react-native-elements';
import { useProfilesContext } from '../../../Hooks/Profiles';

const List = ({ navigation, style = {}, parentId }) => {

    const { profiles } = useProfilesContext();

    return (
        <ScrollView style={style}>
            {
                profiles.map((l, i) => (
                    <ListItem
                        key={i} title={l.name} bottomDivider chevron
                        containerStyle={{minHeight: 60}}
                        onPress={() => navigation.navigate('ProfileDetails', { profileId: l.id })}
                    />
                ))
            }
            <TouchableHighlight onPress={() => navigation.navigate('AddProfile', { parentId })} underlayColor='#d6d7da' style={{
                height: 60,
                borderRadius: 4,
                borderWidth: 2,
                borderStyle: 'dashed',
                borderColor: '#d6d7da',
                alignItems: 'center',
                justifyContent: 'center',
                margin: 5,
            }}>
                <Text style={{color: '#bcbdc0', fontSize: 15}}>+ Add Profile</Text>
            </TouchableHighlight >
        </ScrollView>
    )
}

export default List;