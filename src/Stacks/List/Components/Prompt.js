import React from 'react';
import { View } from 'react-native';
import { Button, Overlay, Text } from 'react-native-elements';

const Prompt = ({ isVisible, title, text, acceptPromptFn, cancelPromptFn }) => {
    return (
        <Overlay
        isVisible={isVisible}
        width="90%"
        height="auto"
        >
            <View style={{ alignSelf: 'center', alignContent: 'center', alignItems: 'center' }}>
                <Text h4>{title}</Text>
                <Text style={{ padding: 15 }}>{text}</Text>
                <View style={{flexDirection: 'row', alignItems: 'center', alignContent: 'center'}}>
                    <Button title="Ok" buttonStyle={{width: 150, height: 50, marginRight: 10 }} onPress={acceptPromptFn}/>
                    <Button title="Cancel" buttonStyle={{width: 150, height: 50, marginLeft: 10  }} onPress={cancelPromptFn}/>
                </View>
            </View>
        </Overlay>
    )
}

export default Prompt;