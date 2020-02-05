import React from 'react';
import List from './Components/List';

const ListScreen = ({ navigation }) => (
    <List 
        navigation={navigation}
        filterFn={(i) => i.parentId === 0}
        parentId={0}
        needsChildren={true}
    />
)
        
ListScreen.navigationOptions = {
    title: 'List of Events'
}
        
export default ListScreen;