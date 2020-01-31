import Reactotron from 'reactotron-react-native'
import { AsyncStorage } from 'react-native';

const inspectAsyncStore = () => {
    AsyncStorage.getAllKeys((err, keys) => {
        AsyncStorage.multiGet(keys, (err, stores) => {
            Reactotron.log(stores)
        });
    });
}

export {
    inspectAsyncStore
}