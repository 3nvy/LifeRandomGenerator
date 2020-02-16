import React, { useState, useEffect } from 'react';
import List from './Components/List';
import { View } from 'react-native';
import { Icon } from 'react-native-elements';
import FileImport from './Components/FileImport';
import FileExport from './Components/FileExport';

const ListScreen = ({ navigation }) => {
    const [isImporting, setImporting] = useState(false);
    const [isExporting, setExporting] = useState(false);

    useEffect(() => {
        navigation.setParams({ setImporting, setExporting });
    }, [])

    return (
        <View>
            <FileImport isVisible={isImporting} setVisible={setImporting}/>
            <FileExport isVisible={isExporting} setVisible={setExporting}/>
            <List 
                navigation={navigation}
                filterFn={(i) => i.parentId === 0}
                parentId={0}
                needsChildren={true}
            />
        </View>
    )
}

ListScreen.navigationOptions = ({ navigation }) => {
    const { setImporting, setExporting } = navigation.state.params || {};

    return {
        title: 'Event Groups',
        headerRight: () => (
           <View style={{flexDirection: 'row'}}>
            <Icon 
                name='file-download' 
                color='white'
                underlayColor='#C70039'
                iconStyle={{marginLeft: 10, marginRight: 10}}
                onPress={() => setExporting(true)}
            />
            <Icon 
                name='file-upload' 
                color='white'
                underlayColor='#C70039'
                iconStyle={{marginLeft: 10, marginRight: 20}}
                onPress={() => setImporting(true)}
            />
           </View>
        )
      }
}

        
export default ListScreen;