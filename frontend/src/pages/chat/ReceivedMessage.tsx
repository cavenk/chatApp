import {MessageType} from "../../enums/MessageType"
import { Message } from "../../models/Message"

interface Props {
    message : Message
}


export function ReceivedMessage(props : Props){
    const {
        username,
        type,
        message
    } = props.message

    const setMessage = () =>{
        if(type === MessageType.CONNECTED)
            return "Connected to the room."

        if(type === MessageType.DISCONNECTED)
            return "Disconnected from the room"

        return message
    }

    const setStyle = () => type === MessageType.MESSAGE ? "msg-received" : "msg-connected"

    return (
        <div className="my-3">
            <div className="mb-1">{username}</div>
            <div className={"d-inline-block p-2 rounded " + setStyle()}><b>{setMessage()}</b></div>
        </div>
    )
}