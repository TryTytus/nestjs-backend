"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventsGateway = void 0;
const websockets_1 = require("@nestjs/websockets");
const socket_io_1 = require("socket.io");
let EventsGateway = class EventsGateway {
    afterInit(server) {
        server.use((socket, next) => {
            const username = socket.handshake.auth.username;
            if (!username) {
                return next(new Error("invalid username"));
            }
            socket.username = username;
            next();
        });
    }
    handleConnection(socket) {
        const users = [];
        for (let [id, socket] of this.server.of("/").sockets) {
            users.push({
                userID: id,
                username: socket.username,
            });
        }
        socket.emit("users", users);
        socket.broadcast.emit("user connected", {
            userID: socket.id,
            username: socket.username,
        });
        socket.on("private message", ({ content, to }) => {
            socket.to(to).emit("private message", {
                content,
                from: socket.id,
            });
        });
        socket.on("disconnect", () => {
            socket.broadcast.emit("user disconnected", socket.id);
        });
    }
    handleDisconnect(socket) {
        socket.broadcast.emit("user disconnected", socket.id);
    }
};
exports.EventsGateway = EventsGateway;
__decorate([
    (0, websockets_1.WebSocketServer)(),
    __metadata("design:type", socket_io_1.Server)
], EventsGateway.prototype, "server", void 0);
exports.EventsGateway = EventsGateway = __decorate([
    (0, websockets_1.WebSocketGateway)({
        cors: {
            origin: 'http://localhost:5173',
            credentials: true,
        },
    })
], EventsGateway);
//# sourceMappingURL=events.gateway.js.map