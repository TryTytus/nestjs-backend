import { UseGuards } from '@nestjs/common';
import { IoAdapter } from '@nestjs/platform-socket.io';
import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { AuthGuard } from 'src/auth/auth.guard';
import { JwtHeader, SigningKeyCallback } from 'jsonwebtoken';
import jwt = require('jsonwebtoken');
import JwksRsa = require('jwks-rsa');

type CustomSocket = Socket & { username: string; nickname: string };

let client = JwksRsa({
  jwksUri: 'http://localhost:3000/auth/jwt/jwks.json',
});

function getKey(header: JwtHeader, callback: SigningKeyCallback) {
  client.getSigningKey(header.kid, function (err, key) {
    var signingKey = key!.getPublicKey();
    callback(err, signingKey);
  });
}

@WebSocketGateway({
  cors: {
    origin: 'http://localhost:5173',
    credentials: true,
  },
})
export class EventsGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer()
  server: Server;

  afterInit(server: Server) {
    server.use((socket: CustomSocket, next) => {
      const username = socket.handshake.auth.username;
      if (!username) {
        return next(new Error('invalid username'));
      }
      socket.username = username;
      next();
    });

    server.use(function (socket: any, next: any) {
      // we first try and verify the jwt from the token param.
      if (socket.handshake.query && socket.handshake.query.token) {
        jwt.verify(
          socket.handshake.query.token,
          getKey,
          {},
          function (err, decoded) {
            if (err) return next(new Error('Authentication error'));
            socket.decoded = decoded;
            next();
          },
        );
      } else {
        next(new Error('Authentication error'));
      }
    });
  }

  handleConnection(socket: CustomSocket) {
    const socketToken = socket.handshake.query.token;

    const token = Array.isArray(socket.handshake.query.token)
      ? socket.handshake.query.token[0]
      : socket.handshake.query.token;

    const adam = {
      username: 'trytytus',
    };

    const benio = {
      username: 'benio',
    };

    // fetch existing users
    let users = [adam, benio];

    const globSocket = socket
    

    for (let [id, socket] of this.server.of('/').sockets as Map<
      string,
      CustomSocket
    >) {
      users = users.map((user: any) => {
        if (user.username === globSocket.username)
          user.uuid = jwt.decode(token).sub
        if (user.username === socket.username)
          return {
            ...user,
            userID: id,
            connected: true,
          };
        return user;
      });
    }
    socket.emit('users', users);

    // notify existing users
    socket.broadcast.emit('user connected', {
      userID: socket.id,
      username: socket.username,
      uuid: jwt.decode(token).sub,
    });

    // forward the private message to the right recipient
    socket.on('private message', ({ content, to, senderUsername }) => {
      socket.to(to).emit('private message', {
        content,
        from: socket.id,
        senderUsername,
        senderUUID: jwt.decode(token).sub
      });
    });

    // notify users upon disconnection
    socket.on('disconnect', () => {
      socket.broadcast.emit('user disconnected', socket.id);
    });
  }

  handleDisconnect(socket: CustomSocket) {
    socket.broadcast.emit('user disconnected', socket.id);
  }
}
