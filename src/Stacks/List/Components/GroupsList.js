import React, { useState, useEffect } from 'react';
import { ScrollView , Text, TouchableHighlight } from 'react-native';
import { ListItem, Icon } from 'react-native-elements';
import InputPrompt from './InputPrompt';
import { useListContext } from '../../../Hooks/List';

const GroupsList = ({ navigation, isVisible, itemId }) => {

    const { list, dispatchList } = useListContext();
    const findItem = () => list.find(i => i.id === itemId);
    
    const [{ splitPickGroups = [] } = {}, setCurrentItem] = useState(findItem);
    const [promptVisible, setPromptVisibility] = useState(false);

    // Create a new group within the list item
    const createNewGroup = groupName => {
        dispatchList({
            type: 'update',
            data: {
                id: itemId,
                splitPickGroups: [...splitPickGroups, groupName]
            }
        });
        setPromptVisibility(false);
    }

    // Create a group from the list item
    const removeGroup = groupName => {
        dispatchList({
            type: 'update',
            data: {
                id: itemId,
                splitPickGroups: [...splitPickGroups.filter(group => group !== groupName)]
            }
        });
    }

    // Remove all groups from the list item
    const removeAllGroups = () => {
        dispatchList({
            type: 'update',
            data: {
                id: itemId,
                splitPickGroups: []
            }
        });
    }

    // Update current item when list is updated
    useEffect(() => setCurrentItem(findItem), [list]);

    // Update current item when list is updated
    useEffect(() => {
        if(!isVisible) removeAllGroups()
    }, [isVisible]);

    if(!isVisible)
    return <ScrollView></ScrollView>

    return (
        <ScrollView>

            <InputPrompt 
                isVisible={promptVisible}
                setVisible={setPromptVisibility}
                title='New Group'
                inputLabel='Type in the group name'
                inputPlaceholder='Group 1'
                submitText='Create'
                submitFn={createNewGroup}
            />

            {
                splitPickGroups.map((group, i) => (
                    <ListItem
                        key={i}
                        title={group}
                        rightIcon={<Icon name='delete' iconStyle={{marginRight: 10}} onPress={() => removeGroup(group)} />}
                        bottomDivider 
                    />
                ))
            }
            <TouchableHighlight onPress={() => setPromptVisibility(true)} underlayColor='#d6d7da' style={{
                height: 60,
                borderRadius: 4,
                borderWidth: 2,
                borderStyle: 'dashed',
                borderColor: '#d6d7da',
                alignItems: 'center',
                justifyContent: 'center',
                margin: 5,
            }}>
                <Text style={{color: '#bcbdc0', fontSize: 15}}>+ Add new group for splitting</Text>
            </TouchableHighlight >
        </ScrollView>
    )
}

export default GroupsList;