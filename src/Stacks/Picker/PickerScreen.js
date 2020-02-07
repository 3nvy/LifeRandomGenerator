import React, { useState, useEffect } from 'react';
import { useStore } from '../../../Store';
import { Button } from 'react-native-elements';

import { ScrollView, View } from 'react-native';
import { ListItem } from 'react-native-elements';
import { Card } from 'react-native-elements';

const DividerPicker = ({ selection }) => {

    const [groupOne, groupTwo] = selection;

    return (
        <View style={{flex: 1, flexDirection: 'row'}}>
            <Card 
                title='Group 1'
                containerStyle={{margin: 5, marginBottom: 5, flex: 1}}
            >
                {
                    groupOne.map((item, i) => <ListItem key={`G1-${i}`} title={item.name} />)
                }
            </Card>
            <Card 
                title='Group 2'
                containerStyle={{margin: 5, marginBottom: 5, flex: 1}}
            >
                {
                    groupTwo.map((item, i) => <ListItem key={`G2-${i}`} title={item.name} />)
                }
            </Card>
        </View>
    )
}

const getSingleSelection = list => list[0].name;

const getSplitSelection = list => {
    const splitIndex = Math.ceil(list.length / 2);
    return [list.slice(0,splitIndex), list.slice(splitIndex)];
}

const PickerScreen = ({ navigation }) => {

    const [{ list }, dispatch] = useStore();
    const [story, setStory] = useState([]);

    // Reset story when list changes
    useEffect(() => setStory([]), [list])

    const randomPicker = () => {
        const mainGroups = list.filter(i => !i.parentId && i.enabled).sort((a, b) => a.order - b.order)
        
        const groups = mainGroups.reduce((acc, g) => {
            const shuffledList = list.filter(i => i.parentId === g.id && i.enabled).sort(() => .5 - Math.random());
            const isSplitPick = g.isSplitPick;
            const obj = {
                name: g.name,
                splitPick: isSplitPick,
                selection: isSplitPick ? getSplitSelection(shuffledList) : getSingleSelection(shuffledList)
            }

            acc.push(obj);

            return acc
        }, [])

        setStory(groups);
    }

    return (
        <View>
            <Button
                buttonStyle={{borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0, backgroundColor: '#C70039'}}
                title='Random Pick' 
                onPress={randomPicker}
            />

            <ScrollView>
            {
                story.map((l, i) => {
                    
                    if(l.splitPick)
                        return (
                            <View key={i}>
                                <ListItem title={l.name} bottomDivider />
                                <DividerPicker selection={l.selection} />
                            </View>
                        )

                    return (
                        <ListItem
                            key={i}
                            title={l.name}
                            subtitle={l.selection}
                            bottomDivider
                        />
                    )

                })
            }
            </ScrollView>
        </View>
    )

}

PickerScreen.navigationOptions = {
    title: 'Picker'
}

export default PickerScreen;