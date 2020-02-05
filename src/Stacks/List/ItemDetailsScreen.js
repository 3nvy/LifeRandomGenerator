import to from 'await-to-js';
import React, { useEffect, useState } from 'react';
import { AsyncStorage, ScrollView } from 'react-native';
import { Icon , Card, Text } from 'react-native-elements';
import List from './Components/List';
import Prompt from './Components/Prompt';
import { useStore } from '../../../Store';
import { deleteItemFromList } from './Context';

const ItemDetailsScreen = ({ navigation }) => {

    const [{ list }, dispatch] = useStore();
    const [showPrompt, setPrompt] = useState(false);
    const { data: { id, description } } = navigation.state.params;

    const onItemDelete = async() => {
        await deleteItemFromList(list, dispatch, id);
        setPrompt(false);
        navigation.navigate('List');
    }

    const cancelPrompt = () => setPrompt(false);

    useEffect(() => {
        navigation.setParams({ setPrompt });
    }, [])

    return (
        <ScrollView style={{margin: 10}}>

            <Prompt 
                isVisible={showPrompt}
                acceptPromptFn={onItemDelete}
                cancelPromptFn={cancelPrompt}
                title='Warning!'
                text='Are you sure you want to delete this item? All children items will be lost!'
            />

            <Card 
                title='Details'
                containerStyle={{margin: 0, marginBottom: 10}}
            >
                <Text style={{marginBottom: 10}}>
                    {description || 'No Description Provided'}
                </Text>
            </Card>

            <Card 
                title='Sub Items'
                containerStyle={{margin: 0}}
                dividerStyle={{marginBottom: 0}}
            >
                <List 
                    navigation={navigation}
                    filterFn={i => i.parentId === id}
                    parentId={id}
                />
            </Card>
        </ScrollView>
    )
}
        
ItemDetailsScreen.navigationOptions = ({ navigation }) => {
    const { data: { name }, setPrompt } = navigation.state.params;

    return {
        title: name,
        headerRight: () => (
            <Icon 
                name='delete' 
                color='white'
                underlayColor='#C70039'
                iconStyle={{marginRight: 10}}
                onPress={() => setPrompt(true)}
            />
        )
      }

    return {
      title: name
    }
};

        
export default ItemDetailsScreen;