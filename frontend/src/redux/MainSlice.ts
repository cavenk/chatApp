import { createSlice } from "@reduxjs/toolkit";
import { Message } from "../models/Message";

interface State {
    isConnected : boolean,
    isConnectedToRoom : boolean,
    username : string | null,
    idUser : string | null,
    idRoom : string | null,
    messages : Message[],
    userTyping : Message | null
}

const initialState : State = {
    isConnected : false,
    isConnectedToRoom : false,
    username : null,
    idUser : null,
    idRoom : null,
    messages : [],
    userTyping : null
}

const MainSlice = createSlice({
    name : "mainSlice",

    initialState,

    reducers : {
        setConnection(state, action){
            state.isConnected = true
            state.username = action.payload.username
            state.idUser = action.payload.idUser
            state.idRoom = action.payload.idRoom
        },

        setRoomConnection(state, action){
            state.isConnectedToRoom = action.payload
        },

        addNewMessage(state, action){
            state.messages.push(action.payload as Message)
        },

        setUserTyping(state, action){
            state.userTyping = action.payload
        }, 

        reset(state, action){
            state.isConnected = false
            state.isConnectedToRoom = false
            state.idRoom = null
            state.idUser = null
            state.username = null
            state.userTyping = null
            state.messages = []
        }

    }
})

export const MainSliceReducer = MainSlice.reducer
export const MainSliceAction = MainSlice.actions