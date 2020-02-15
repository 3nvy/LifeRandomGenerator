import React, { useState, useEffect } from 'react';
import * as FileSystem from 'expo-file-system';
import { ToastAndroid , View } from 'react-native';
import { Icon, Overlay, Text, ListItem, Divider  } from 'react-native-elements';
import { useListContext } from '../../../Hooks/List';

const FileImport = ({ isVisible, setVisible }) => {

    const { dispatchList } = useListContext();
    const [fileList, setFileList] = useState([]);

    useEffect(() => {
        if(isVisible) loadFileList()
     }, [isVisible])

    const loadFileList = async() => {
        let files;
        try {
            files = await FileSystem.readDirectoryAsync(`${FileSystem.documentDirectory}files/`);
        }
        catch(err){
            await FileSystem.makeDirectoryAsync(`${FileSystem.documentDirectory}files/`);
            files = await FileSystem.readDirectoryAsync(`${FileSystem.documentDirectory}files/`);
        }
        setFileList(files);
    }

    const importFile = async(fileName) => {
        const file = await FileSystem.readAsStringAsync(`${FileSystem.documentDirectory}files/${fileName}`);

        dispatchList({
            type: 'resetData',
            data: JSON.parse(file)
        })

        setVisible(false);

        ToastAndroid.show('File successfully imported!', ToastAndroid.LONG);
    }

    const removeFile = async(fileName) => {
        await FileSystem.deleteAsync(`${FileSystem.documentDirectory}files/${fileName}`);
        loadFileList();
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
                    <Text style={{fontSize: 19, fontWeight: 'bold'}}>Importing From File</Text>
                    <Icon name='close' onPress={() => setVisible(false)}/>
                </View>
                <Divider style={{ backgroundColor: '#C70039' }} />
                <View>
                    {
                        fileList.map((f, i) => 
                            <ListItem 
                            key={i} 
                            title={f} 
                            topDivider={i === 0} 
                            rightIcon={<Icon name='delete' onPress={() => removeFile(f)}/>}
                            bottomDivider 
                            onPress={() => importFile(f)} />
                        )
                    }
                </View>
            </View>
        </Overlay>
    )
}

export default FileImport;