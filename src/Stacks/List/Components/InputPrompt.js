import React, { useState } from 'react';
import { View } from 'react-native';
import { Overlay, Text, Input, Button, Icon, Divider } from 'react-native-elements';

const InputPrompt = ({ 
    title = 'Title',
    inputLabel = 'Type some text',
    inputPlaceholder = '',
    submitText = 'Submit',
    isVisible = false, 
    submitFn = () => {},
    setVisible = () => {} 
}) => {

    const [inputText, setInputText] = useState('');

    const onInputTextChange = ({nativeEvent: { text }}) => setInputText(text || '');

    const onSubmit = () => {
        submitFn(inputText);
        setInputText('');
    }

    const onClose = () => {
        setInputText('');
        setVisible(false);
    }

    return (
        <Overlay
        isVisible={isVisible}
        width="90%"
        height="auto"
        overlayStyle={{padding: 0}}
        >
            <View>
                <View style={{
                     paddingVertical: 15,
                     paddingHorizontal: 10,
                     flexDirection: "row",
                     justifyContent: "space-between",
                     alignItems: "center"
                }}>
                    <Text style={{fontSize: 19, fontWeight: 'bold'}}>{title}</Text>
                    <Icon name='close' onPress={onClose}/>
                </View>
                <Divider style={{ backgroundColor: '#C70039' }} />
                <View>
                    <Text style={{ padding: 15 }}>{inputLabel}</Text>
                    <Input
                            value={inputText}
                            placeholder={inputPlaceholder}
                            onChange={onInputTextChange}
                    />
                    <Button title={submitText} onPress={onSubmit} buttonStyle={{ height: 50, marginTop: 25, borderRadius:0, borderBottomEndRadius: 3, borderBottomLeftRadius: 3, backgroundColor: '#C70039'}}/>
                </View>
            </View>
        </Overlay>
    )
}

export default InputPrompt;