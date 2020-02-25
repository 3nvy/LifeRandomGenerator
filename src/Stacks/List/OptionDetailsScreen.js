import React, { useEffect, useState } from 'react';
import { ScrollView, View, Picker } from 'react-native';
import { Icon , Card, Text, CheckBox, Divider } from 'react-native-elements';
import List from './Components/List';
import GroupsList from './Components/GroupsList';
import Prompt from './Components/Prompt';
import { useListContext } from '../../Hooks/List';

const ItemDetailsScreen = ({ navigation }) => {

    const { list, dispatchList } = useListContext();
    const [showPrompt, setPrompt] = useState(false);
    const { data: { id, description, isSplitPick, order } } = navigation.state.params;

    const onItemDelete = () => {
        dispatchList({
            type: 'remove',
            data: id
        })
        setPrompt(false);
        navigation.goBack();
    }

    const onSplitPickChange = () => {
        dispatchList({
            type: 'update',
            data: { id, isSplitPick: !isSplitPick }
        })
        navigation.setParams({ data: {...navigation.state.params.data, isSplitPick: !isSplitPick} })
    }

    const onChangeItemOrder = newOrder => {
        dispatchList({
            type: 'changeOrder',
            data: { id, currentOrder: order, newOrder }
        })
        navigation.setParams({ data: {...navigation.state.params.data, order: newOrder} })
    }

    const cancelPrompt = () => setPrompt(false);

    useEffect(() => {
        navigation.setParams({ setPrompt });
    }, [])

    return (
        <ScrollView style={{margin: 10}}>

            {/* Delete Prompt */}
            <Prompt 
                isVisible={showPrompt}
                acceptPromptFn={onItemDelete}
                cancelPromptFn={cancelPrompt}
                title='Warning!'
                text='Are you sure you want to delete this option? All nested options will be lost!'
            />

            {/* Details Card */}
            <Card 
                title='Details'
                containerStyle={{margin: 0, marginBottom: 0}}
            >
                <Text style={{marginBottom: 10}}>
                    {description || 'No Description Provided'}
                </Text>
            </Card>

            {/* Item Order */}
            <Card containerStyle={{margin: 0, marginBottom: 10, padding: 0, borderTopColor: 'transparent'}}>
                <View style={{
                     paddingHorizontal: 10,
                     flexDirection: "row",
                     justifyContent: "space-between",
                     alignItems: "center"
                }}>
                    <Text style={{flex: .5, textAlign: "center"}}>Load Order</Text>
                    <Picker
                        selectedValue={order}
                        style={{height: 50, flex: .5}}
                        onValueChange={onChangeItemOrder}
                    >
                        { [...Array(list.filter(i => !i.parentId).length)].map((value, i) => <Picker.Item key={i} label={`${i+1}`} value={i+1} />) }
                    </Picker>
                </View>
            </Card>
    

            {/* Split Selection */}
            <Card containerStyle={{margin: 0, marginBottom: 10, padding: 0, borderTopColor: 'transparent'}}
                title={
                    <View>
                        <CheckBox title='Use Split Pick' center iconRight checked={isSplitPick} containerStyle={{backgroundColor: 'transparent', borderColor: 'transparent'}} onPress={onSplitPickChange} />
                        <Divider style={{ marginHorizontal: 15 }} />
                    </View>
                }
            >
                <GroupsList navigation={navigation} isVisible={isSplitPick} itemId={id} />
            </Card>

            <Card 
                title='Options'
                containerStyle={{margin: 0}}
                dividerStyle={{marginBottom: 0}}
            >
                <List 
                    navigation={navigation}
                    filterFn={i => i.parentId === id}
                    parentId={id}
                />
            </Card>
        </ScrollView>
    )
}
        
ItemDetailsScreen.navigationOptions = ({ navigation }) => {
    const { data: { name }, setPrompt } = navigation.state.params;

    return {
        title: name,
        headerRight: () => (
            <Icon 
                name='close' 
                color='white'
                underlayColor='#C70039'
                iconStyle={{marginRight: 10}}
                onPress={() => setPrompt(true)}
            />
        )
      }
};

        
export default ItemDetailsScreen;