import React, { useState, useEffect } from 'react';
import * as FileSystem from 'expo-file-system';
import List from './Components/List';
import { View } from 'react-native';
import { Icon, Overlay, Text, ListItem } from 'react-native-elements';
import { useListContext } from '../../Hooks/List';

const exportFile = async(store) => {

    console.log(file)

}


const FileImport = ({ isVisible, setVisible }) => {

    const { dispatchList } = useListContext();
    const [fileList, setFileList] = useState([]);

    useEffect(() => {
        (async() => {
            const files = await FileSystem.readDirectoryAsync(FileSystem.documentDirectory);
            setFileList(files);
        })();
    }, [])

    const importFile = async(fileName) => {
        const file = await FileSystem.readAsStringAsync(`${FileSystem.documentDirectory}${fileName}`);
    
        console.log(JSON.parse(file))

        dispatchList({
            type: 'resetData',
            data: JSON.parse(file)
        })

        setVisible(false);
    }

    return (
        <Overlay
        isVisible={isVisible}
        width="90%"
        height="auto"
        >
            <View>
                <View style={{ alignSelf: 'center', alignContent: 'center', alignItems: 'center' }}>
                    <Text h4>Importing From File</Text>
                    <Text style={{ padding: 15 }}>Choose file to import</Text>
                </ View>
                <View>
                    {
                        fileList.map((f, i) => <ListItem key={i} title={f} topDivider={i === 0} bottomDivider onPress={() => importFile(f)} />)
                    }
                </View>
            </View>
        </Overlay>
    )
}

const ListScreen = ({ navigation }) => {
    const [isImporting, setImporting] = useState(false);
    const [isExporting, setExporting] = useState(false);

    useEffect(() => {
        navigation.setParams({ setImporting, setExporting });
    }, [])

    return (
        <View>
            <FileImport isVisible={isImporting} setVisible={setImporting}/>
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
        title: 'List of Events',
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