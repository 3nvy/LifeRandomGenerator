import { AsyncStorage } from 'react-native';
import to from 'await-to-js';
import { inspectAsyncStore } from '../../../Inspector';

const findChildrenItems = (list, id) => {
  const items = list.filter(i => i.parentId === id).map(i => i.id);
  return ([list].length === 0) ? [id] : [id, ...items.map(i => findChildrenItems(list, i))].flat();
}

const addItemToList = (list, data) => {
  const id = list.reduce((acc, i) => (+i.id > acc) ? i.id : acc, 0) + 1
  const newList = [...list, {
      id,
      ...data
  }] 

  AsyncStorage.setItem('items-list', JSON.stringify(newList))
  inspectAsyncStore();

  return newList;
}

const deleteItemFromList = (list, id) => {
  const idsToRemove = findChildrenItems(list, id);
  const newList = [...list.filter(l => !idsToRemove.includes(l.id))];
  AsyncStorage.setItem('items-list', JSON.stringify(newList))

  return newList;
}

const reducer = (state, action) => {
  const listState = state.list;

  switch (action.type) {
    case 'list@addItem':
      return addItemToList(listState, action.data);

    case 'list@removeItem':
      return deleteItemFromList(listState, action.data);
      
    default:
      return listState;
  }
}; 

export const ListReducer = (state, action) => ({ list: reducer(state, action) })
export const ListLoader = () => new Promise(async resolve => {

  // await to(AsyncStorage.removeItem('items-list'));
  let [err, list] = await to(AsyncStorage.getItem('items-list'));
  if(list == null) await to(AsyncStorage.setItem('items-list', JSON.stringify([])));

  return resolve(JSON.parse(list || '[]'));

})