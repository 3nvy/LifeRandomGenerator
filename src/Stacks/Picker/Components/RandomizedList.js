import React, { useState, useEffect } from 'react';
import { ScrollView, View } from 'react-native';
import { ListItem, Button, Text } from 'react-native-elements';
import DividerPicker from './DividerPicker'

import { useListContext } from '../../../Hooks/List';
import { useProfilesContext } from '../../../Hooks/Profiles';

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

const randomPicker = (list) => {
    const mainGroups = list.filter(i => !i.parentId && i.enabled).sort((a, b) => a.order - b.order)

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
    }, []);

    return groups;
}

const RandomizedList = () => {

    const { list } = useListContext();
    const { selectedProfile, profiles } = useProfilesContext();
    const [randomList, setRandomList] = useState([]);

    // Reset list when list changes
    useEffect(() => setRandomList([]), [list, profiles])

    
    // Dont display anything if theres no selected profile
    if(!selectedProfile) return false;


    // Display info message if the profile doesnt have any available groups randomize
    if(!list.count(i => i.profileId === selectedProfile && i.enabled)) return (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <Text style={{ fontSize: 20, fontFamily: 'sans-serif-thin' }}>No Options Available to Randomize</Text>
            <Text style={{ marginTop: 10, fontSize: 15, fontFamily: 'sans-serif-thin', textAlign: 'center' }}>{'Go to the selected profile \n and add some options to randomize'}</Text>
        </View>
    )

    // Display groups to randomize for selected profile
    return (
        <ScrollView style={{display: 'flex'}}>
             <Button
                buttonStyle={{flex: 0, borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0, backgroundColor: '#C70039'}}
                title='Press to Randomize Profile' 
                onPress={() => setRandomList(randomPicker(list))}
            />
            {
                randomList.map((l, i) => {
                    
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
    )
}

export default RandomizedList;
