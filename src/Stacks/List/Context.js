import { AsyncStorage } from 'react-native';
import to from 'await-to-js';

const reducer = (state, action) => {
    const listState = state.list;
    
    switch (action.type) {
      case 'setList':
        return action.data;
        
      default:
        return listState;
    }
}; 

export const ListInitialstate = { list: [] };
export const ListReducer = (state, action) => ({ list: reducer(state, action) })
export const loadListData = dispatch => new Promise(async resolve => {
  let [err, list] = await to(AsyncStorage.getItem('items-list'));
  if(list == null) await to(AsyncStorage.setItem('items-list', JSON.stringify([])));
  
  dispatch({
      type: 'setList',
      data: JSON.parse(list || '[]')
  })

  return resolve();

})