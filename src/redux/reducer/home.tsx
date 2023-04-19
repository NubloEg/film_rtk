import {createSlice, PayloadAction} from "@reduxjs/toolkit";



export interface homeInt{
    page:string,
    genre:string,
    rating:number
}


const initialState:homeInt={
    page:"1",
    genre:'all',
    rating:0
}

const homeSlice=createSlice({
    name:'home',
    initialState,
    reducers:{
        change_page:(state,action:PayloadAction<homeInt>)=>{
            state.page=action.payload.page
            state.genre=action.payload.genre

}


    }
})

export const {change_page} = homeSlice.actions
export default homeSlice.reducer