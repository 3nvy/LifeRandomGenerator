import to from 'await-to-js';
import React, { useEffect } from 'react';
import { AsyncStorage } from 'react-native';
import List from './Components/List';
import { useStore } from '../../../Store';

const ListScreen = ({ navigation }) => {

    const [{ list }, dispatch] = useStore();

    useEffect(() => {
        (async() => {
            // await AsyncStorage.removeItem('items-list');
            let [err, list] = await to(AsyncStorage.getItem('items-list'));

            if(list == null) await to(AsyncStorage.setItem('items-list', JSON.stringify([])));
            try {
                dispatch({
                    type: 'setList',
                    data: JSON.parse(list || '[]')
                })
            }
            catch(err){
                alert('Error getting data');
            }
        })()
    }, [])

    return (
        <List 
            navigation={navigation}
            filterFn={(i) => i.parentId === 0}
            parentId={0}
        />
    )
}
        
ListScreen.navigationOptions = {
    title: 'List of Events'
}
        
export default ListScreen;