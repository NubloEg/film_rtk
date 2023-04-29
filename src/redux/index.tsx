import {combineReducers, configureStore} from "@reduxjs/toolkit";
import film from "./reducer/film";
import list from "./reducer/list";
import {filmsApi} from "./filmsAPI/films.api";
import home from "./reducer/home";
import profile from "./reducer/profile";


const rootReducer=combineReducers({
film,
list,
[filmsApi.reducerPath]:filmsApi.reducer,
    home,
    profile

})


export const store=configureStore({reducer:rootReducer,middleware:(getDefaultMiddleware)=>getDefaultMiddleware().concat(filmsApi.middleware)})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch