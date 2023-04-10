import {createSlice, PayloadAction} from "@reduxjs/toolkit";



export interface homeInt{
    page:string,
    category:string,
    rating:number
}


const initialState:homeInt={
    page:"1",
    category:'All',
    rating:0
}

const homeSlice=createSlice({
    name:'home',
    initialState,
    reducers:{
        change_page:(state,action:PayloadAction<homeInt>)=>{
            state.page=action.payload.page
            state.category=action.payload.category

}


    }
})

export const {change_page} = homeSlice.actions
export default homeSlice.reducer