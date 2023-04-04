import {useEffect} from "react"
import { Message } from "../../models/Message"
import { SentMessage } from "./SentMessage"
import { ReceivedMessage } from "./ReceivedMessage"
import {useSelector} from "react-redux"
import { RootState } from "../../redux/Store"
import { useMessagingService } from "../../hooks/useMessagingService"
import { ChatInput } from "./ChatInput"
import { TypingAlert } from "./TypingAlert"
import { Navigate, useNavigate } from "react-router-dom"


export function Chat(){
    const {
        messages, 
        idUser, 
        idRoom, 
        isConnected
    } = useSelector((state : RootState) => state.mainSlice)

    const {subscribeToRoom, disconnectFromServer} = useMessagingService()
    const navigate = useNavigate()


    const showMessage = () => 
        messages.map((msg : Message) =>{
            if(msg.idUser === idUser)
                return <SentMessage key={msg.idMessage} message={msg} />
            else
                return <ReceivedMessage key={msg.idMessage} message={msg} />
        })

    useEffect(() => {
        subscribeToRoom()
    }, [])

   if(!isConnected)
        return <Navigate to="/" />

    return(
        <div className="vh-100 bg-grey d-flex flex-column">
            {/* Navbar */}
            <nav className="bg-primary p-3">
                <h2 className="text-white">Chat App</h2>
            </nav>

            {/* Main */}
            <main className="container-md bg-white flex-fill d-flex flex-column overflow-hidden">

                <div className="d-flex justify-content-between py-3 border-bottom">
                    <h2>{idRoom}</h2>
                    <button className="btn btn-danger text-white" onClick={disconnectFromServer}>Leave Room</button>
                </div>

                {/* Message container */}
                <div className="flex-fill overflow-auto">{showMessage()}</div>

                {/* Typing alert */}
                <div className="py-1">
                    <TypingAlert />
                </div>

                {/* Chat input */}
                <div className="py-3">
                    <ChatInput />
                </div>
                
            </main>

        </div>
    )
}