import {
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway(80, { transports: ['websocket'] })
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  handleDisconnect(client: Socket) {
    console.log('연결 끊김', client.id);
    this.server.emit('disconnection', {
      message: `${client.id}님이 퇴장하셨습니다.`,
    });
  }

  handleConnection(client: Socket) {
    console.log('연결 완료', client.id);
    this.server.emit('connection', {
      message: `${client.id}님이 입장하셨습니다.`,
    });
  }

  @SubscribeMessage('hello')
  findAll(@MessageBody() data: string) {
    console.log(data);
    this.server.emit('hello', data);
  }
}
