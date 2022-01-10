//tells our store what to do with the data 

// eslint-disable-next-line import/no-anonymous-default-export
export default (state, action) => {
    switch(action.type) {
        case "ADD_ENTERTAINMENT_TO_WATCHLIST":
            return {
                ...state,
                watchList: [action.payload, ...state.watchList]
            };
        case "REMOVE_ENTERTAINMENT_FROM_WATCHLIST":
            return {
                ...state,
                watchList: state.watchList.filter(entertainment => entertainment.id !== action.payload)
            };
        case "ADD_ENTERTAINMENT_TO_WATCHED":
            return {
                ...state,
                watchList: state.watchList.filter(entertainment => entertainment.id !== action.payload.id),
                watched: [action.payload, ...state.watched]
            };
        case "MOVE_TO_WATCHLIST":
            return {
                ...state,
                watched: state.watched.filter(entertainment => entertainment.id !== action.payload.id),
                watchList: [action.payload, ...state.watchList]
            }
        case "REMOVE_ENTERTAINMENT_FROM_WATCHED":
            return {
                ...state,
                watched: state.watched.filter(entertainment => entertainment.id !== action.payload)
            }
        default: 
            return state;
    }
};