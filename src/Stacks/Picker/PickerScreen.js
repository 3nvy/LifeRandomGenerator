import React from 'react';
import { View } from 'react-native';
import { ProfilePicker, RandomizedList } from './Components';


const PickerScreen = ({ navigation }) => (
    <View style={{flex: 1, flexDirection: 'column'}}>
        <ProfilePicker />
        <RandomizedList />
    </View>
)

PickerScreen.navigationOptions = {
    title: 'Picker'
}

export default PickerScreen;