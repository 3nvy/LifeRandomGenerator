import to from 'await-to-js';
import React from 'react';
import { AsyncStorage, ScrollView } from 'react-native';
import { Button, Card, Text } from 'react-native-elements';
import List from './Components/List';
import { useStore } from '../../../Store';

const ItemDetailsScreen = ({ navigation }) => {

    const [{ list }, dispatch] = useStore();
    const { data: { id, name, description } } = navigation.state.params;

    const onItemDelete = async() => {
        const newList = [...list.filter(l => l.id !== id)];
        await to(AsyncStorage.setItem('items-list', JSON.stringify(newList)))
        dispatch({
            type: 'setList',
            data: newList
        })
        navigation.navigate('List');
    }

    return (
        <ScrollView style={{margin: 10}}>
            <Card title={name}>
                <Text style={{marginBottom: 10}}>
                    {description}
                </Text>
                <Button
                    buttonStyle={{borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0, backgroundColor: '#C70039'}}
                    title='Delete Item' 
                    onPress={onItemDelete}
                />
                <Text h4>Sub Items</Text>
                <List 
                    navigation={navigation}
                    filterFn={i => i.parentId === id}
                    parentId={id}
                />
            </Card>
        </ScrollView>
    )
}
        
ItemDetailsScreen.navigationOptions = {
    title: 'Details'
}
        
export default ItemDetailsScreen;