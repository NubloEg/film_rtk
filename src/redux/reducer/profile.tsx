import {createSlice, PayloadAction} from "@reduxjs/toolkit";


export interface profileInt {
    user:userInt,
    isAutorization: boolean,
    allUsers:Array<userInt>,
    isPage:String

}


export interface userInt {
    id: number,
    img?:string
    name: string
    username: string
    email: string
    password:string|number
    address?: Address
}

export interface Address {
    street: string
    suite: string
    city: string
    zipcode: string
    geo: Geo
}

export interface Geo {
    lat: string
    lng: string
}



const initialState:profileInt={
   user:{
       id:1,
       name:"Egor",
       username:'NubloEg',
       email:'gaf555@yandex.ru',
       password:'123',
       img:'https://sun9-77.userapi.com/s/v1/ig2/wQp7ojuZmwwLbfBSGVO3sV2jrCL2yfmcFiM7vCeGSruuUs49MGeftmodGrDzx6SRr6oKmimthB1zHvCmoJHQftlz.jpg?size=200x200&quality=95&crop=377,795,815,815&ava=1'
   },
    allUsers:[{
        id:1,
        name:"Egor",
        username:'NubloEg',
        email:'gaf555@yandex.ru',
        password:'123',
        img:'https://sun9-77.userapi.com/s/v1/ig2/wQp7ojuZmwwLbfBSGVO3sV2jrCL2yfmcFiM7vCeGSruuUs49MGeftmodGrDzx6SRr6oKmimthB1zHvCmoJHQftlz.jpg?size=200x200&quality=95&crop=377,795,815,815&ava=1'
    }],
    isAutorization:false,
    isPage:'auto'

}
let id=2;

const profileSlice=createSlice({
    name:'profile',
    initialState,
    reducers:{
        onChangeInfoProfile:(state,action:PayloadAction<userInt>)=>{
          state.user.name=action.payload.name
            state.user.email=action.payload.email
                state.user.password=action.payload.password

        },
        createProfile:(state,action:PayloadAction<userInt>)=>{
            state.user.id=id++
            state.user.name=action.payload.name
            state.user.email=action.payload.email
            state.user.password=action.payload.password
            state.isAutorization=true
        },
        autoProfile:(state,action:PayloadAction<profileInt>)=>{
                state.isAutorization=true
                state.user=action.payload.user
                },
        onChangePage:(state,action:PayloadAction<String>)=>{
            state.isPage=action.payload
        }



    }
})

export const {onChangeInfoProfile,createProfile,autoProfile,onChangePage} = profileSlice.actions
export default profileSlice.reducer