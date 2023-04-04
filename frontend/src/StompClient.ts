import SockJS from "sockjs-client";
import {Client, CompatClient, Stomp, IFrame, IMessage} from "@stomp/stompjs"
import { Message } from "./models/Message";

let client : CompatClient | null = null



export function connectToServer(onConnect : Function) : void{
    const sockJs : WebSocket = new SockJS("https://chatappbackend-hkkl.onrender.com/ws")
    client = Stomp.over(sockJs)

    client.onConnect = (frame : IFrame) =>{
        onConnect() 
    }

    client.activate()
}

export function disconnectFromServer(onDisconnect : Function){
    if(!client)
        return

    client!.onDisconnect = (frame : IFrame) => {
        onDisconnect()
        client = null
    }
    client!.deactivate()
}

export function subscribe(idRoom : string, idUser : string, username : string, onMessage : Function ){
    const headers = {
        idUser,
        username
    }
    client?.subscribe(`/topic/room/${idRoom}`, (incomingMessage : IMessage)=>{
        console.log(incomingMessage)

        const body = JSON.parse(incomingMessage.body)

        console.log(body)

        const message : Message = {
            idUser : body.idUser,
            idMessage : incomingMessage.headers["message-id"],
            username : body.username,
            type :  body.type,
            message : body.message 
        }

        onMessage(message)
    }, headers)

}



export function sendMessage(idRoom : string, message : Message){
    client?.publish({
        destination : `/app/room/${idRoom}`,
        body : JSON.stringify(message),
    })

}


