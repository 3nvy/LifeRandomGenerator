import to from 'await-to-js';
import React, { useState } from 'react';
import { AsyncStorage, ScrollView, View } from 'react-native';
import { Input, Button  } from 'react-native-elements';
import { useStore } from '../../../Store';
import { inspectAsyncStore } from '../../../Inspector';

const WrappeInput = ({ label, placeholder, value, setFn, multiline = false }) => (
    <View style={{marginTop: 10, marginBottom: 20}}>
        <Input
            inputStyle={{textAlignVertical: multiline ? 'top' : 'center'}}
            label={label}
            placeholder={placeholder}
            value={value}
            multiline={multiline}
            numberOfLines={multiline ? 10 : 1}
            onChange={evt => setFn(evt.nativeEvent.text)}
        />
    </View>
)

const AddListItemScreen = ({ navigation }) => {

    const [{ list }, dispatch] = useStore();
    const { parentId } = navigation.state.params;

    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [submiting, setSubmiting] = useState(false);

    const submitItem = async() => {
        setSubmiting(true);

        const id = list.reduce((acc, i) => (+i.id > acc) ? i.id : acc, 0) + 1
        const newList = [...list, {
            id,
            parentId,
            name,
            description
        }] 

        await to(AsyncStorage.setItem('items-list', JSON.stringify(newList)));
        inspectAsyncStore();
        dispatch({
            type: 'setList',
            data: newList
        })

        navigation.goBack();
    }

    return (
        <ScrollView style={{margin: 10}}>
            <WrappeInput label="Name" placeholder="Input Name" value={name} setFn={setName} />

            <WrappeInput label="Description" placeholder="Set some description ..." value={description} setFn={setDescription} multiline={true} />

            <Button title="Submit Item" buttonStyle={{height: 50}} onPress={submitItem} loading={submiting} disabled={submiting}/>

        </ScrollView>
    )
}
        
AddListItemScreen.navigationOptions = {
    title: 'Add New Event'
}
        
export default AddListItemScreen;