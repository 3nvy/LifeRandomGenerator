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