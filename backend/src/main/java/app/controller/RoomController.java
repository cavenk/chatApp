package app.controller;

import app.enums.MessageType;
import app.models.MessageBody;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.*;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.messaging.simp.annotation.SubscribeMapping;
import org.springframework.stereotype.Controller;

@Controller
public class RoomController  {
    @Autowired
    SimpMessagingTemplate template;


    @SubscribeMapping("/room/{idRoom}")
    @SendTo("/topic/room/{idRoom}")
    public MessageBody onSubscribe(@Header String username, @Header String idUser){
        return new MessageBody(idUser, username, MessageType.CONNECTED, null);
    }

    @MessageMapping("/room/{idRoom}")
    public MessageBody onMessageReceived(@Payload MessageBody body){
        return body;
    }



}
