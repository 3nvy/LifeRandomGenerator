import { AsyncStorage } from 'react-native';
import to from 'await-to-js';
import { inspectAsyncStore } from '../../../Inspector';

const reducer = (state, action) => {
    const listState = state.list;
    
    switch (action.type) {
      case 'setList':
        return action.data;
        
      default:
        return listState;
    }
}; 

const findChildrenItems = (list, id) => {
  const items = list.filter(i => i.parentId === id).map(i => i.id);
  return ([list].length === 0) ? [id] : [id, ...items.map(i => findChildrenItems(list, i))].flat();
}

export const ListInitialstate = { list: [] };
export const ListReducer = (state, action) => ({ list: reducer(state, action) })

export const loadListData = dispatch => new Promise(async resolve => {

  // await to(AsyncStorage.removeItem('items-list'));
  let [err, list] = await to(AsyncStorage.getItem('items-list'));
  if(list == null) await to(AsyncStorage.setItem('items-list', JSON.stringify([])));
  
  dispatch({
      type: 'setList',
      data: JSON.parse(list || '[]')
  })

  return resolve();

})

export const addItemToList = (list, dispatch, data) => new Promise(async resolve => {
  const id = list.reduce((acc, i) => (+i.id > acc) ? i.id : acc, 0) + 1
  const newList = [...list, {
      id,
      ...data
  }] 

  await to(AsyncStorage.setItem('items-list', JSON.stringify(newList)));
  dispatch({
      type: 'setList',
      data: newList
  })

  inspectAsyncStore();

  return resolve();

})

export const deleteItemFromList = (list, dispatch, id) => new Promise(async resolve => {
  const idsToRemove = findChildrenItems(list, id);
  const newList = [...list.filter(l => !idsToRemove.includes(l.id))];
  await to(AsyncStorage.setItem('items-list', JSON.stringify(newList)))
  dispatch({
      type: 'setList',
      data: newList
  })

  return resolve();

})