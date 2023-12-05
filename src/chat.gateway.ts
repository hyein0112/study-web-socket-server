import {
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway(80, { transports: ['websocket'] })
export class ChatGateway
  implements OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit
{
  @WebSocketServer()
  server: Server;

  afterInit(server: Server) {
    console.count('Init');
  }

  handleDisconnect(client: Socket) {
    console.log('연결 끊김');
  }

  handleConnection(client: Socket) {
    console.log('연결 완료');
  }

  @SubscribeMessage('hello')
  findAll(@MessageBody() data: string) {
    console.log(data);
    this.server.emit('hello', data);
  }
}
