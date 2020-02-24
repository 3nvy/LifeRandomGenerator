import React from 'react';
import { ScrollView , Text, TouchableHighlight } from 'react-native';
import { ListItem, CheckBox } from 'react-native-elements';
import { useListContext } from '../../../Hooks/List';

const List = ({ navigation, filterFn, parentId, isProfileGroup }) => {

    const {list, dispatchList} = useListContext();

    const changeItemEnableStatus = item => {
        const enableStatus = !item.enabled;
        dispatchList({
            type: 'update',
            data: { id: item.id, enabled: enableStatus }
        })
    }

    return (
        <ScrollView>
            {
                list.filter(filterFn).sort((a, b) => a.order - b.order).map((l, i) => (
                    <ListItem
                        key={i}
                        title={l.name}
                        leftIcon={<CheckBox checked={l.enabled} containerStyle={{ padding: 0}} onPress={() => changeItemEnableStatus(l)} />}
                        bottomDivider chevron
                        onPress={()=> navigation.push('OptionDetails', { data: l }) }
                    />
                ))
            }
            <TouchableHighlight onPress={() => navigation.navigate('AddOption', { isProfileGroup, parentId })} underlayColor='#d6d7da' style={{
                height: 60,
                borderRadius: 4,
                borderWidth: 2,
                borderStyle: 'dashed',
                borderColor: '#d6d7da',
                alignItems: 'center',
                justifyContent: 'center',
                margin: 5,
            }}>
                <Text style={{color: '#bcbdc0', fontSize: 15}}>{isProfileGroup ? '+ Add Profile Group' : '+ Add Event'}</Text>
            </TouchableHighlight >
        </ScrollView>
    )
}

export default List;