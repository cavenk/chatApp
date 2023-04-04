package app.models;

import app.enums.MessageType;


public record MessageBody(
        String idUser,
        String username,
        MessageType type,
        String message
) {}
