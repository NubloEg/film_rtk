import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {filmInt} from "./film";


interface initial{
    myList:Array<listInt>,
    nowList:listInt
}

export interface listInt{
    id:number,
    name:string|number,
    count:number,
    runtime:number,
    mid_score:number,
    description?:string|number,
    films:Array<filmInt>

}


const initialState:initial={
    myList:[

    ],
    nowList:{
        id:-1,name:'title',description:'sdf',films:[],count:0,runtime:0,mid_score:0
    }
}
let id_main=1
const listSlice=createSlice({
    name:'list',
    initialState,
    reducers:{

        change_nowList:(state,action:PayloadAction<listInt>)=>{
            state.nowList=action.payload
        },
        add_list:(state,action:PayloadAction<listInt>)=>{
            state.myList.push({...action.payload,id:id_main})
            id_main++
        },
        change_List:(state,action:PayloadAction<listInt>)=>{

            state.myList=state.myList.map(el=>{
               return( el.id===action.payload.id?{id:el.id,name:action.payload.name,description:action.payload.description,runtime:el.runtime,mid_score:el.mid_score,count:el.count,films:action.payload.films}:el)
            })
        },
        remove_List:(state,action:PayloadAction<listInt>)=>{

            state.myList=state.myList.filter(el=>el.name!==action.payload.name)

        },
        add_film_to_list:(state,action:PayloadAction<listInt>)=>{
            let nowFilm=state.myList[0].films.filter(el=>el.id!==action.payload.films[0].id)

            state.myList=state.myList.map(el=>{
                return( el.id===action.payload.id?{id:el.id,name:action.payload.name,description:action.payload.description,runtime:el.runtime,mid_score:el.mid_score,count:el.count,films:[...nowFilm,...action.payload.films]}:el)
            })
        }


    }
})

export const {change_nowList,add_list,change_List,remove_List,add_film_to_list} = listSlice.actions
export default listSlice.reducer