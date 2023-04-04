import {useDispatch, useSelector} from "react-redux"
import { v4 } from "uuid"
import { MessageType } from "../enums/MessageType"
import { Message } from "../models/Message"
import { MainSliceAction } from "../redux/MainSlice"
import { AppDispatch, RootState } from "../redux/Store"
import * as StompClient from "../StompClient"

export function useMessagingService(){
    
    const dispatch : AppDispatch = useDispatch()
    const mainSlice = useSelector((state : RootState) => state.mainSlice)

    function connectToServer(username : string, idRoom : string){
        if(mainSlice.isConnected)
            return

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

    function disconnectFromServer(){
        if(!mainSlice.isConnected)
            return
        
        // Callback function to be called on disconnect
        const onDisconnect = () => dispatch(MainSliceAction.reset(null))
        
        sendMessage(MessageType.DISCONNECTED)
        StompClient.disconnectFromServer(onDisconnect)
    }
    
    function subscribeToRoom(){
        if(!mainSlice.isConnected || mainSlice.isConnectedToRoom)
            return

        // Function to be called on new message
        const onMessage = (message : Message) => {
            if(message.type === MessageType.TYPING){
                // dispatch typing message only if the user not me
                if(message.idUser !== mainSlice.idUser)
                    dispatch(MainSliceAction.setUserTyping(message)) 
            } else{
                dispatch(MainSliceAction.addNewMessage(message))
            }
        }
    
        StompClient.subscribe(mainSlice.idRoom!, mainSlice.idUser!, mainSlice.username!, onMessage)
        dispatch(MainSliceAction.setRoomConnection(true))
    }
    
    function sendMessage(messageType : MessageType, message : string | null = null){
            
            const body : Message = {
                idUser : mainSlice.idUser!,
                username : mainSlice.username!,
                type : messageType,
                message
            }
        
            StompClient.sendMessage(mainSlice.idRoom!, body)
        
    }

    return {
        connectToServer,
        subscribeToRoom,
        sendMessage, 
        disconnectFromServer
    }

}