import React, { useReducer, useEffect } from "react";
import to from 'await-to-js';
import constate from "constate";
import { AsyncStorage } from 'react-native';

const reducer = (state, action) => {
    switch(action.type){
        default:
        return action.data
    }
}

const initialState = false;

const useProfiles = () => {
    const [profiles, dispatchProfiles] = useReducer(reducer, initialState);

    useEffect(() => {
        (async() => {
             // await to(AsyncStorage.removeItem('items-list'));
             let [err, profiles] = await to(AsyncStorage.getItem('profiles'));

             dispatchProfiles({
                 type: 'initialLoad',
                 data: JSON.parse(profiles || '[]')
             })
        })()
    }, [])

    return { profiles, dispatchProfiles }
}

const [ProfilesProvider, useProfilesContext] = constate(useProfiles);

export {
    ProfilesProvider, 
    useProfilesContext
}