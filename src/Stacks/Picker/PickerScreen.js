import React, { useState, useEffect } from 'react';
import { Button } from 'react-native-elements';
import { ScrollView, View, Text } from 'react-native';
import { ListItem } from 'react-native-elements';
import DividerPicker from './Components/DividerPicker'

import { useListContext } from '../../Hooks/List';

const getParentGroups = i => !i.parentId && i.enabled;

const getSplitSelection = (groups, list) => {
    const splitIndex = Math.ceil(list.length / groups.length);

    const groupList = groups.length ? groups : ['Default Group'];

    const splitArray = groupList.map((group, i) => ({ name: group, selections: list.slice(i*splitIndex, (i+1) * splitIndex) }))

    return splitArray;
}

const getShuffledList = (contextList, groupId) => contextList.filter(i => i.parentId === groupId && i.enabled).sort(() => .5 - Math.random());

const getNextRandomPick = (contextList, group) => {
    if(group.isSplitPick) return [{ ...group, options: getShuffledList(contextList, group.id) }]

    const childrenItem = getShuffledList(contextList, group.id);
    if(!childrenItem.length) return [];

    const child = childrenItem[0];
    return child.isSplitPick ? [{ ...child, options: getShuffledList(contextList, child.id) }] : [child, getNextRandomPick(contextList, child)];
}

const PickerScreen = ({ navigation }) => {

    const { list } = useListContext();
    const [story, setStory] = useState([]);

    // Reset story when list changes
    useEffect(() => setStory([]), [list])

    const randomPicker = () => {
        const mainGroups = list.filter(getParentGroups).sort((a, b) => a.order - b.order)

        const groups = mainGroups.reduce((acc, group) => {
            const children = getNextRandomPick(list, group).flat(Infinity);
            const selection = children[children.length-1];

            children.length && acc.push({
                name: group.name,
                path: children.map(c => c.name).join(' / '),
                splitPick: selection.isSplitPick,
                ...(selection.isSplitPick && { options: getSplitSelection(selection.splitPickGroups, selection.options) })
            });

            return acc
        }, [])

        setStory(groups);
    }

    return (
        <View>

            { list.count(getParentGroups) ? 
                <Button
                    buttonStyle={{borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0, backgroundColor: '#C70039'}}
                    title='Random Pick' 
                    onPress={randomPicker}
                /> :
                <View style={{height: '100%', justifyContent: 'center', alignItems: 'center'}}>
                    <Text style={{ fontSize: 20, fontFamily: 'sans-serif-thin' }}>No Groups Available to Randomize</Text>
                    <Text style={{ marginTop: 10, fontSize: 15, fontFamily: 'sans-serif-thin' }}>{'- Go to the list menu and create some groups -'}</Text>
                </View>
            }

            <ScrollView>
            {
                story.map((l, i) => {
                    
                    if(l.splitPick)
                        return (
                            <View key={i}>
                                <ListItem title={l.name} subtitle={l.path} bottomDivider />
                                <DividerPicker groups={l.options} />
                            </View>
                        )

                    return (
                        <ListItem
                            key={i}
                            title={l.name}
                            subtitle={l.path}
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