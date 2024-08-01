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

type CustomSocket = Socket & { username: string };

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
        return next(new Error("invalid username"));
      }
      socket.username = username;
      next();
    });
  }

  handleConnection(socket: CustomSocket) {
    // fetch existing users
    const users = [];
    for (let [id, socket] of this.server.of("/").sockets as Map<string, CustomSocket>) {
      users.push({
        userID: id,
        username: socket.username,
      });
    }
    socket.emit("users", users);

    // notify existing users
    socket.broadcast.emit("user connected", {
      userID: socket.id,
      username: socket.username,
    });

    // forward the private message to the right recipient
    socket.on("private message", ({ content, to }) => {
      socket.to(to).emit("private message", {
        content,
        from: socket.id,
      });
    });

    // notify users upon disconnection
    socket.on("disconnect", () => {
      socket.broadcast.emit("user disconnected", socket.id);
    });
  }

  handleDisconnect(socket: CustomSocket) {
    socket.broadcast.emit("user disconnected", socket.id);
  }
}
