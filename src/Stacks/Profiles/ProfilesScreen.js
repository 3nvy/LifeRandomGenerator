import React, { useState, useEffect } from 'react';
import { View } from 'react-native';
import List from './Components/List';

const ProfilesScreen = ({ navigation }) => {

    return (
        <View>
            <List navigation={navigation} />
        </View>
    )
}

ProfilesScreen.navigationOptions = ({ navigation }) => {
    return {
        title: 'Profiles'
      }
}

        
export default ProfilesScreen;