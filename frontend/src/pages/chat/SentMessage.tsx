import {MessageType} from "../../enums/MessageType"
import { Message } from "../../models/Message"

interface Props {
    message : Message
}


export function SentMessage(props : Props){

    const {
        username,
        type,
        message
    } = props.message

    const setMessage = () =>{
        if(type === MessageType.CONNECTED)
            return "You are connected to this room."

        return message
    }

    const setStyle = () => type === MessageType.MESSAGE ? "msg-send" : "msg-connected"

    return (
        <div className="my-3 text-end">
            <div className="mb-1">{username}</div>
            <div className={"d-inline-block p-2 rounded " + setStyle()}><b>{setMessage()}</b></div>
        </div>
    )
}