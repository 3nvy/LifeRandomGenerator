import React, { useState, useEffect } from 'react';
import List from './Components/List';
import { View } from 'react-native';
import { Icon } from 'react-native-elements';
import Prompt from './Components/Prompt';
import { useProfilesContext } from '../../Hooks/Profiles';

const ListScreen = ({ navigation }) => {

    const { profileId } = navigation.state.params;
    const [showPrompt, setPrompt] = useState(false);
    const { dispatchProfiles } = useProfilesContext();

    const onRemoveProfile = () => {
        dispatchProfiles({
            type: 'remove',
            data: profileId
        })
        setPrompt(false);
        navigation.navigate('Profiles');
    }

    const cancelPrompt = () => setPrompt(false);

    useEffect(() => {
        navigation.setParams({ setPrompt });
    }, [])

    return (
        <View>

             {/* Delete Prompt */}
             <Prompt 
                isVisible={showPrompt}
                acceptPromptFn={onRemoveProfile}
                cancelPromptFn={cancelPrompt}
                title='Warning!'
                text='Are you sure you want to delete this profile? All profile data will be lost!'
            />

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
    const { setPrompt } = navigation.state.params;

    return {
        title: 'Profile Details',
        headerRight: () => (
           <View style={{flexDirection: 'row'}}>
            <Icon 
                name='clear' 
                color='white'
                underlayColor='#C70039'
                iconStyle={{marginLeft: 10, marginRight: 10}}
                onPress={() => setPrompt(true)}
            />
           </View>
        )
      }
}

        
export default ListScreen;