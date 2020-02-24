import React, { useState, useEffect } from 'react';
import { ScrollView, View } from 'react-native';
import { Input, Button } from 'react-native-elements';
import Prompt from './Components/Prompt';
import { useProfilesContext } from '../../Hooks/Profiles';

const capitalizeFirstLetter = string => string.charAt(0).toUpperCase() + string.slice(1); 

const validateField = ({ field, value }) => {
    const valueLength = value.length;

    if(valueLength > 0 && valueLength < 3) return { [`${field}Error`]: `${capitalizeFirstLetter(field)} needs to be at least least 3 characters long.` }
    
    return { [`${field}Error`]: '' }
}

const WrappeInput = ({ label, placeholder, pkey, value, setFn, multiline = false, errorMsg, setErrorsFn }) => (
    <View style={{marginTop: 10, marginBottom: 20}}>
        <Input
            inputStyle={{textAlignVertical: multiline ? 'top' : 'center'}}
            label={label}
            placeholder={placeholder}
            value={value}
            errorStyle={{ color: 'red' }}
            errorMessage={errorMsg}
            multiline={multiline}
            numberOfLines={multiline ? 8 : 1}
            onChange={({nativeEvent: { text }}) => {

                // Error Handling
                setErrorsFn && setErrorsFn(state => ({
                    ...state,
                    ...validateField({ field: pkey, value: text })
                }));

                // Set new state
                setFn(state => {
                    return {
                        ...state,
                        [pkey]: text
                    }
                })
            }}
        />
    </View>
)

const AddProfileScreen = ({ navigation }) => {

    const { dispatchProfiles } = useProfilesContext();
    const { showPrompt = false } = navigation.state.params;

    const [{ name }, setForm] = useState({ name: '' });
    const [submiting, setSubmiting] = useState(false);
    const [{ nameError }, setErrors] = useState({ nameError: '' });
    const [isFormValid, setFormValid] = useState(false);

    const submitItem = async() => {
        setSubmiting(true);
        navigation.setParams({ canNavigateAway: true });
        dispatchProfiles({
            type: 'add',
            data: name
        })
        navigation.goBack();
    }

    const acceptPrompt = () => {
        navigation.setParams({ canNavigateAway: true, showPrompt: false }),
        setTimeout(() => navigation.goBack(), 1);
    } 

    const cancelPrompt = () => {
        navigation.setParams({ showPrompt: false });
    } 

    useEffect(() => {
        setFormValid(!nameError && name.length > 0);
    }, [name, nameError])

    return (
        <ScrollView style={{ margin: 10 }}>

            <Prompt 
                isVisible={showPrompt}
                acceptPromptFn={acceptPrompt}
                cancelPromptFn={cancelPrompt}
                title='Warning!'
                text='Are you sure you want to navigate away? All changes will be lost if you do.'
            />

            <WrappeInput label="Name *" placeholder="Profile Name" pkey='name' value={name} setFn={setForm} errorMsg={nameError} setErrorsFn={setErrors} />

            <Button title="Submit Profile" buttonStyle={{height: 50}} onPress={submitItem} loading={submiting} disabled={!isFormValid || submiting}/>

        </ScrollView>
    )
}
        
AddProfileScreen.navigationOptions = {
    title: 'Add New Profile'
}
        
export default AddProfileScreen;