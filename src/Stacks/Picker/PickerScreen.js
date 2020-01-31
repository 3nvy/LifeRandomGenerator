import React, { useState } from 'react';
import { useStore } from '../../../Store';
import { Button } from 'react-native-elements';

import { ScrollView , Text, TouchableHighlight } from 'react-native';
import { ListItem } from 'react-native-elements';

const PickerScreen = ({ navigation }) => {

    const [{ list }, dispatch] = useStore();
    const [story, setStory] = useState([]);

    const randomPicker = () => {
        const mainGroups = list.filter(i => !i.parentId)
        
        const groups = mainGroups.reduce((acc, g) => {

            const obj = {
                name: g.name,
                selection: list.filter(i => i.parentId === g.id).sort(() => .5 - Math.random())[0].name
            }

            acc.push(obj);

            return acc
        }, [])

        setStory(groups);
    }

    return (
        <ScrollView>
            {
                story.map((l, i) => (
                    <ListItem
                        key={i}
                        title={l.name}
                        subtitle={l.selection}
                        bottomDivider
                    />
                ))
            }

            <Button
                buttonStyle={{borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0, backgroundColor: '#C70039'}}
                title='Random Pick' 
                onPress={randomPicker}
            />
        </ScrollView>
    )

}

PickerScreen.navigationOptions = {
    title: 'Picker'
}

export default PickerScreen;