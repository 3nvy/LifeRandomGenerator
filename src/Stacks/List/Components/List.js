import React from 'react';
import { ScrollView , Text, TouchableHighlight } from 'react-native';
import { ListItem, CheckBox } from 'react-native-elements';
import { useListContext } from '../../../Hooks/List';

const List = ({ navigation, filterFn, style = {}, parentId, needsChildren = false }) => {

    const {list, dispatchList} = useListContext();

    const changeItemEnableStatus = item => {
        const enableStatus = !item.enabled;
        dispatchList({
            type: 'update',
            data: { id: item.id, enabled: enableStatus }
        })
    }

    return (
        <ScrollView style={style}>
            {
                list.filter(filterFn).sort((a, b) => a.order - b.order).map((l, i) => (
                    <ListItem
                        key={i}
                        title={l.name}
                        leftIcon={<CheckBox checked={l.enabled} containerStyle={{ padding: 0}} onPress={() => changeItemEnableStatus(l)} />}
                        {...(needsChildren && !list.find(item => item.parentId === l.id) ? {subtitle: 'Needs 1 event to be valid to randomize'} : {})}
                        bottomDivider chevron
                        onPress={()=> navigation.push('ItemDetails', { data: l }) }
                    />
                ))
            }
            <TouchableHighlight onPress={() => navigation.navigate('AddListItem', { parentId })} underlayColor='#d6d7da' style={{
                height: 60,
                borderRadius: 4,
                borderWidth: 2,
                borderStyle: 'dashed',
                borderColor: '#d6d7da',
                alignItems: 'center',
                justifyContent: 'center',
                margin: 5,
            }}>
                <Text style={{color: '#bcbdc0', fontSize: 15}}>{parentId ? '+ Add Event' : '+ Add Group'}</Text>
            </TouchableHighlight >
        </ScrollView>
    )
}

export default List;