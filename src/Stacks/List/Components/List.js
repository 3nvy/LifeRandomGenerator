import React from 'react';
import { ScrollView , Text, TouchableHighlight } from 'react-native';
import { ListItem } from 'react-native-elements';
import { useStore } from '../../../../Store';

const List = ({ navigation, filterFn, style = {}, parentId }) => {

    const [{ list }, dispatch] = useStore();

    return (
        <ScrollView style={style}>
            {
                list.filter(filterFn).map((l, i) => (
                    <ListItem
                        key={i}
                        title={l.name}
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
                <Text style={{color: '#bcbdc0', fontSize: 30}}>+</Text>
            </TouchableHighlight >
        </ScrollView>
    )
}

export default List;