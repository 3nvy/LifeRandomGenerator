import React, { useState, useEffect } from 'react';
import to from 'await-to-js';
import * as FileSystem from 'expo-file-system';
import { ToastAndroid , View } from 'react-native';
import { Overlay, Text, Input, Button, Icon, Divider } from 'react-native-elements';
import { useListContext } from '../../../Hooks/List';

const FileExport = ({ isVisible, setVisible }) => {

    const defaultFileName = `bkp-${new Date().toISOString().slice(0,10)}`;
    const [fileName, setFileName] = useState(defaultFileName)

    const { list } = useListContext();

    const onFileNameChange = ({nativeEvent: { text }}) => setFileName(text || defaultFileName);

    const onFileExport = async() => {

        let [err] = await to(FileSystem.writeAsStringAsync(`${FileSystem.documentDirectory}files/${fileName}.txt`, JSON.stringify({ list })))

        if(err){
            await FileSystem.makeDirectoryAsync(`${FileSystem.documentDirectory}files/`);
            await FileSystem.writeAsStringAsync(`${FileSystem.documentDirectory}files/${fileName}.txt`, JSON.stringify({ list }))
        }

        setVisible(false);
        ToastAndroid.show('File exported successfully!', ToastAndroid.LONG)
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
                    <Text style={{fontSize: 19, fontWeight: 'bold'}}>Exporting to File</Text>
                    <Icon name='close' onPress={() => setVisible(false)}/>
                </View>
                <Divider style={{ backgroundColor: '#C70039' }} />
                <View>
                    <Text style={{ padding: 15 }}>Choose file name</Text>
                    <Input
                            placeholder={defaultFileName}
                            onChange={onFileNameChange}
                    />
                    <Button title="Export to File" onPress={onFileExport} buttonStyle={{ height: 50, marginTop: 25, borderRadius:0, borderBottomEndRadius: 3, borderBottomLeftRadius: 3, backgroundColor: '#C70039'}}/>
                </View>
            </View>
        </Overlay>
    )
}

export default FileExport;