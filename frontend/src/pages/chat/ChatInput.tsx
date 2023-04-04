import { ChangeEvent, MouseEvent, useState } from "react"
import { MessageType } from "../../enums/MessageType"
import { useMessagingService } from "../../hooks/useMessagingService"

export function ChatInput(){

    const [input, setInput] = useState<string>("")
    const {sendMessage} = useMessagingService()


    const onInputChange = (e : ChangeEvent<HTMLInputElement>) =>{
        setInput(e.target.value)
        sendMessage(MessageType.TYPING)
    }

    const onClick = (e : MouseEvent<HTMLButtonElement>) =>{
        sendMessage(MessageType.MESSAGE, input)
        setInput("")
    }

    return(
        <div className="d-flex gap-4">
            <input className="flex-fill border border-2 border-dark rounded-2 p-1" placeholder="Enter your message..." type="text" onChange={onInputChange} value={input} />
            <button className="btn btn-primary" onClick={onClick}><i className="bi bi-send-fill"></i></button>
        </div>
    )
}