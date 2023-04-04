import { ChangeEvent, useState, MouseEvent  } from "react"
import { useNavigate } from "react-router-dom"
import {useSelector, useDispatch} from "react-redux"
import { RootState } from "../../redux/Store"
import {useEffect} from "react"
import { useMessagingService } from "../../hooks/useMessagingService"

export function Login(){

    const navigate = useNavigate()
    const {isConnected} = useSelector((state : RootState) => state.mainSlice)
    const {connectToServer} = useMessagingService()


    const [username, setUsername] = useState({
        isValid : true,
        value : ""
    })

    const [idRoom, setIdRoom] = useState({
        isValid : true,
        value : ""
    })

    const onUsernameChange = (event : ChangeEvent<HTMLInputElement>) =>
        setUsername(state => ({
            isValid : true,
            value : event.target.value
        }))

    const onIdRoomChange = (event : ChangeEvent<HTMLInputElement>) =>
    setIdRoom(state => ({
        isValid : true,
        value : event.target.value
    }))

    

    const onClick = (event : MouseEvent<HTMLButtonElement>)=>{
        if(username.value === "" || idRoom.value === "")
            return
            
        connectToServer(username.value, idRoom.value)
    }
    

    useEffect(()=>{
        if(isConnected)
            navigate(`/room`)
    }, [isConnected])

        

    return(
        <div className="min-vh-100 bg-primary d-flex justify-content-center align-items-center p-4">
            {/* Card */}
            <div className="card p-5 d-flex flex-column gap-4 col-12 col-sm-10 col-md-7 col-lg-6 col-xl-5 col-xxl-3">

                {/* Title */}
                <div className="text-center">
                    <h2>Chat App</h2>
                    <div className="text-secondary">Please create or join a room</div>
                </div>

                {/* Username */}
                <div>
                    <label ><b>Username</b></label>
                    <input type="text" className="form-control border border-dark" maxLength={25} onChange={onUsernameChange} value={username.value} />
                </div>

                {/* RoomID */}
                <div>
                    <label ><b>Room ID </b></label>
                    <input type="text" className="form-control border border-dark" maxLength={25}  onChange={onIdRoomChange} value={idRoom.value} />
                </div>

                {/* Button */}
                <div className="text-center">
                    <button className="btn btn-success px-5 text-white" onClick={onClick}><b>Join</b></button>
                </div>
            </div>
        </div>
    )
}