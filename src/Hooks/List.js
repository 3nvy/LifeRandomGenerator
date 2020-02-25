import React, { useReducer, useEffect } from "react";
import to from 'await-to-js';
import constate from "constate";
import { AsyncStorage } from 'react-native';

import { useProfilesContext } from './Profiles';

const findChildrenItems = (list, id) => {
    const items = list.filter(i => i.parentId === id).map(i => i.id);
    return ([list].length === 0) ? [id] : [id, ...items.map(i => findChildrenItems(list, i))].flat();
}

const addItemToList = (list, data) => {
    const order = !data.parentId && list.filter(i => !i.parentId).length + 1 || 0;
    const id = list.reduce((acc, i) => (+i.id > acc) ? i.id : acc, 0) + 1
    const newList = [...list, {
        ...data, id, order
    }] 
    
    AsyncStorage.setItem('items-list', JSON.stringify(newList));
    
    return newList;
}

const deleteItemFromList = (list, id) => {
    const idsToRemove = findChildrenItems(list, id);
    const newList = [...list.filter(l => !idsToRemove.includes(l.id))];
    AsyncStorage.setItem('items-list', JSON.stringify(newList))
    
    return newList;
}

const updateItemFromList = (list, { id, ...args }) => {
    const newList = list.reduce((acc, i) => {
        const item = i.id === id ? {...i, ...args} : i;
        acc.push(item);
        return acc;
    }, [])
    
    AsyncStorage.setItem('items-list', JSON.stringify(newList))
    return newList;
}

const changeItemOrderFromList = (list, { id, currentOrder, newOrder }) => {
    const [min, max] = [currentOrder, newOrder].sort((a, b) => a - b);
    
    const newList = list.reduce((acc, i) => {
        
        // When we find the item we want to change
        if(i.id === id)
        acc.push({...i, order: newOrder});
        
        // When item is outside of the range of changing
        else if (i.order < min || i.order > max)
        acc.push(i);
        
        // When the current item has the same order as the new one
        else if(i.order > currentOrder)
        acc.push({...i, order: i.order - 1});
        
        else if(i.order < currentOrder)
        acc.push({...i, order: i.order + 1});
        
        else 
        acc.push(i);
        
        return acc;
    }, [])
    
    AsyncStorage.setItem('items-list', JSON.stringify(newList))
    return newList;
}

const setImportedData = list => {
    AsyncStorage.setItem('items-list', JSON.stringify(list))
    return list;
}

const reducer = (state, action) => {
    switch (action.type) {
        case 'initialLoad':
        return action.data;

        case 'resetData':
        return setImportedData(action.data.list);
        
        case 'add':
        return addItemToList(state, action.data);
        
        case 'remove':
        return deleteItemFromList(state, action.data);
        
        case 'update':
        return updateItemFromList(state, action.data);
        
        case 'changeOrder':
        return changeItemOrderFromList(state, action.data);
        
        default:
        return state;
    }
}; 

const initialState = false;

const useList = () => {

    const { profiles } = useProfilesContext();
    const [list, dispatchList] = useReducer(reducer, initialState);
    
    // Load initial data
    useEffect(() => {
        (async() => {
            
            // await to(AsyncStorage.removeItem('items-list'));
            let [err, list] = await to(AsyncStorage.getItem('items-list'));

            dispatchList({
                type: 'initialLoad',
                data: JSON.parse(list || '[]')
            })

        })();
    }, [])

    useEffect(() => {
        // Noop operation when profiles store is still loading
        if(!profiles) return () => {};

        const avaiableProfileIds = profiles && profiles.map(p => p.id) ;
        const groupIdsToRemove = list.reduce((acc, opt) => {
            if(opt.profileId && !avaiableProfileIds.includes(opt.profileId)) acc.push(findChildrenItems(list, opt.id))
            return acc;
        } , []).flat(Infinity)


        // Remove every option related to the removed profiles
        list && dispatchList({
            type: 'resetData',
            data: { list: list.filter(opt => !groupIdsToRemove.includes(opt.id)) }
        })

    }, [profiles])

    return { list, dispatchList };
}

const [ListProvider, useListContext] = constate(useList);

export {
    ListProvider,
    useListContext
}