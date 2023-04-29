import {createSlice, PayloadAction} from "@reduxjs/toolkit";





interface initial{
    allFilms:Array<filmInt>,
    historyFilms:Array<filmInt>,
    nowFilm:filmInt
}



export interface Data<T> {
    movie_count: number
    limit: number
    page_number: number
    movies: T[]
}

export interface Request{
   page:string,
   genre:string,
   rating:number
}

export interface filmInt {
    id: number
    url?: string
    imdb_code?: string
    title: string
    title_english?: string
    title_long?: string
    slug?: string
    year: number
    rating: number
    runtime: number
    genres?: string[]
    summary?: string
    description_full?: string
    synopsis?: string
    yt_trailer_code?: string
    language?: string
    mpa_rating?: string
    background_image?: string
    background_image_original?: string
    small_cover_image?: string
    medium_cover_image?: string
    large_cover_image?: string
    state?: string
    date_uploaded?: string
    date_uploaded_unix?: number,
    cast?:[]
}

const initialState:initial={
    allFilms:[],
    historyFilms:[ ],

    nowFilm:{
        id:-1,
        runtime:10,
        rating:8.4,
        title:"Me favorite",
        year:2023

    }
}

const filmSlice=createSlice({
    name:'films',
    initialState,
    reducers:{
        change_nowFilm:(state,action:PayloadAction<filmInt>)=>{
            state.nowFilm=action.payload
        },
        add_history:(state,action:PayloadAction<filmInt>)=>{
            state.historyFilms=state.historyFilms.filter(el=>el.id!==action.payload.id)
            state.historyFilms.unshift(action.payload)
        },
        set_ALl_Films:(state,action:PayloadAction<filmInt[]>)=>{
            state.allFilms=[...action.payload]
        }

    }
})

export const {change_nowFilm,add_history,set_ALl_Films} = filmSlice.actions
export default filmSlice.reducer