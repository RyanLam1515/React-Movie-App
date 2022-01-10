import React, {createContext, useReducer, useEffect} from 'react';
import AppReducer from "./AppReducer";

// initial state 

const initialState = {
    watchList: localStorage.getItem('watchList') ? JSON.parse(localStorage.getItem('watchList')) : [],
    watched: localStorage.getItem('watched') ? JSON.parse(localStorage.getItem('watched')) : [],
};

// create context 
export const GlobalContext = createContext(initialState);

// provider components allows to access context from other variables
export const GlobalProvider = (props) => {
    // reducer is a function that returns state data
    const [state, dispatch] = useReducer(AppReducer, initialState);

    useEffect(() => {
        localStorage.setItem('watchList', JSON.stringify(state.watchList))
        localStorage.setItem('watched', JSON.stringify(state.watched))
    }, [state])

    // Actions 
    const addEntertainmentToWatchList = (entertainment) => {
        console.log(entertainment)
        dispatch({type: "ADD_ENTERTAINMENT_TO_WATCHLIST", payload: entertainment });
        console.log(state.watchList)
    };

    const removeEntertainmentFromWatchList = (id) => {
        dispatch({type: "REMOVE_ENTERTAINMENT_FROM_WATCHLIST", payload: id});
    }

    const addEntertainmentToWatched = (entertainment) => {
        dispatch({type: "ADD_ENTERTAINMENT_TO_WATCHED", payload: entertainment})
    }

    const moveToWatchList = (entertainment) => {
        dispatch({type: "MOVE_TO_WATCHLIST", payload: entertainment})
    }

    const removeEntertainmentFromWatched = (id) => {
        dispatch({type: "REMOVE_ENTERTAINMENT_FROM_WATCHED", payload: id});
    }


    return (
        <GlobalContext.Provider 
            value={{ 
                watchList: state.watchList, 
                watched: state.watched, 
                addEntertainmentToWatchList, 
                removeEntertainmentFromWatchList, 
                addEntertainmentToWatched,
                moveToWatchList,
                removeEntertainmentFromWatched
                }}>
            {props.children}
        </GlobalContext.Provider>
    )
};