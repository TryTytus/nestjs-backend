import { OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
type CustomSocket = Socket & {
    username: string;
};
export declare class EventsGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
    server: Server;
    afterInit(server: Server): void;
    handleConnection(socket: CustomSocket): void;
    handleDisconnect(socket: CustomSocket): void;
}
export {};
