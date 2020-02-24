import React, { useReducer, useEffect } from "react";
import to from 'await-to-js';
import constate from "constate";
import { AsyncStorage } from 'react-native';

const getSelectedProfileAfterRemove = ({ filteredProfiles, selectedProfile, id }) => {

    if(selectedProfile === id){
        return filteredProfiles.length === 0 ? 0 : filteredProfiles[0].id
    }

    return 0;
}

const addProfileToList = ({ selectedProfile, profiles }, name) => {
    const id = profiles.reduce((acc, i) => (+i.id > acc) ? i.id : acc, 0) + 1

    const extProfiles = {
        selectedProfile: profiles.length === 0 ? id : selectedProfile,
        profiles: [...profiles, { id, name }]
    }
    
    AsyncStorage.setItem('profiles', JSON.stringify(extProfiles));
    
    return extProfiles;
}

const removeProfileFromList = ({ selectedProfile, profiles }, id) => {
    const filteredProfiles = profiles.filter(l => l.id !== id);

    const extProfiles = {
        selectedProfile: getSelectedProfileAfterRemove({ filteredProfiles, selectedProfile, id }),
        profiles: filteredProfiles
    }
    AsyncStorage.setItem('profiles', JSON.stringify(extProfiles))
    return extProfiles;
}

const updateSelectedProfile = (store, selectedProfileId) => {
    const extProfiles = {
        ...store,
        selectedProfile: selectedProfileId
    }
    AsyncStorage.setItem('profiles', JSON.stringify(extProfiles))
    return extProfiles;
}

const reducer = (store, action) => {
    switch(action.type){
        case 'initialLoad':
        return action.data

        case 'add':
        return addProfileToList(store, action.data);

        case 'remove':
        return removeProfileFromList(store, action.data);

        case 'updateSelectedProfile':
        return updateSelectedProfile(store, action.data);

        default:
        return store
    }
}

const initialState = {
    selectedProfile: 0,
    profiles: false
};

const useProfiles = () => {
    const [{ selectedProfile, profiles }, dispatchProfiles] = useReducer(reducer, initialState);

    useEffect(() => {
        (async() => {
            //  await to(AsyncStorage.removeItem('profiles'));
             let [err, profiles] = await to(AsyncStorage.getItem('profiles'));

            dispatchProfiles({
                 type: 'initialLoad',
                 data: profiles ? JSON.parse(profiles) : { ...initialState, profiles: [] }
             })
        })()
    }, [])

    return { selectedProfile, profiles, dispatchProfiles }
}

const [ProfilesProvider, useProfilesContext] = constate(useProfiles);

export {
    ProfilesProvider, 
    useProfilesContext
}