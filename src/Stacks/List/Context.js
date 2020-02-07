import { AsyncStorage } from 'react-native';
import to from 'await-to-js';
import { inspectAsyncStore } from '../../../Inspector';

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

const reducer = (state, action) => {
  const listState = state.list;

  switch (action.type) {
    case 'list@addItem':
      return addItemToList(listState, action.data);

    case 'list@removeItem':
      return deleteItemFromList(listState, action.data);

    case 'list@updateItem':
      return updateItemFromList(listState, action.data);
    
    case 'list@changeItemOrder':
      return changeItemOrderFromList(listState, action.data);
      
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