import {createBrowserRouter} from "react-router-dom"
import { Chat } from "./pages/chat/Chat"
import { Login } from "./pages/login/Login"

export const router = createBrowserRouter([
    {
        path : "/",
        element : <Login />
    },

    {
        path : "/room",
        element : <Chat />
    }
])