import React, { useEffect, useState } from 'react';
import { ScrollView, Picker } from 'react-native';
import { Icon , Card, Text, CheckBox } from 'react-native-elements';
import List from './Components/List';
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
        navigation.navigate('List');
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

            <Prompt 
                isVisible={showPrompt}
                acceptPromptFn={onItemDelete}
                cancelPromptFn={cancelPrompt}
                title='Warning!'
                text='Are you sure you want to delete this item? All children items will be lost!'
            />

            <Card 
                title='Details'
                containerStyle={{margin: 0, marginBottom: 0}}
            >
                <Text style={{marginBottom: 10}}>
                    {description || 'No Description Provided'}
                </Text>
            </Card>
            
            <Card 
                title={ <CheckBox title='Use Split Pick' checked={isSplitPick} containerStyle={{backgroundColor: 'transparent', borderColor: 'transparent'}} onPress={onSplitPickChange} />}
                containerStyle={{margin: 0, marginBottom: 10, padding: 0, borderTopColor: 'transparent'}}
            >
            </Card>

            <Card 
                title={ 
                    <Picker
                        selectedValue={order}
                        style={{height: 50, width: 100}}
                        onValueChange={onChangeItemOrder}
                    >
                        { [...Array(list.filter(i => !i.parentId).length)].map((value, i) => <Picker.Item key={i} label={`${i+1}`} value={i+1} />) }
                    </Picker>
                }
                containerStyle={{margin: 0, marginBottom: 10, padding: 0, borderTopColor: 'transparent'}}
            >
            </Card>
    

            <Card 
                title='Sub Items'
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
                name='delete' 
                color='white'
                underlayColor='#C70039'
                iconStyle={{marginRight: 10}}
                onPress={() => setPrompt(true)}
            />
        )
      }
};

        
export default ItemDetailsScreen;