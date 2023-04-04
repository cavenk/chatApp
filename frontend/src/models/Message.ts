import { MessageType } from "../enums/MessageType";

export type Message = {
    idUser : string,
    type : MessageType,
    username : string,
    message : string | null,
    idMessage? : string
}