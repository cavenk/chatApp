import { AppDispatch, RootState } from "../redux/Store";
import {v4} from "uuid"
import * as StompClient from "../StompClient"
import { MainSliceAction } from "../redux/MainSlice";
import { Message } from "../models/Message";
import { MessageType } from "../enums/MessageType";

export function connectToServer(username : string, idRoom : string, dispatch : AppDispatch){
    // Payload for main slice if connection is successful
    const payload = {
        username, 
        idRoom,
        idUser : v4()
    }

    // Function to be called on successfull connection
    const onConnect = () => dispatch(MainSliceAction.setConnection(payload))

    StompClient.connectToServer(onConnect)
}

export function subscribeToRoom(idRoom : string, username : string, idUser : string, dispatch : AppDispatch){
    // Function to be called on new message
    const onMessage = (message : Message) => dispatch(MainSliceAction.addNewMessage(message))

    StompClient.subscribe(idRoom, idUser, username, onMessage)
}

export function sendMessage( message : string){
    return (dispatch : AppDispatch, getState : () => RootState) => {

        const mainSlice = getState().mainSlice
        
        const body : Message = {
            idUser : mainSlice.idUser!,
            username : mainSlice.username!,
            type : MessageType.MESSAGE,
            message
        }
    
        StompClient.sendMessage(mainSlice.idRoom!, body)
    }
    
}