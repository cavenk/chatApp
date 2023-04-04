import { useEffect, useRef } from "react"
import {useSelector, useDispatch} from "react-redux"
import { MainSliceAction } from "../../redux/MainSlice"
import { RootState } from "../../redux/Store"

export function TypingAlert(){

    const dispatch = useDispatch()
    const timeout = useRef<NodeJS.Timeout | undefined>()
    const { userTyping } = useSelector((state : RootState) => state.mainSlice)

    useEffect(()=>{
        if(userTyping){
            clearTimeout(timeout.current)
            timeout.current = setTimeout(() => dispatch(MainSliceAction.setUserTyping(null)), 500)
        }
            
    }, [userTyping])

    if(userTyping)
        return <div className="d-inline-block p-2 rounded msg-received">{userTyping.username} is typing...</div>
    else
        return null
}