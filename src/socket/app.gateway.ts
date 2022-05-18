import { Logger } from '@nestjs/common';
import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WsResponse,
} from '@nestjs/websockets';
import { Socket } from 'socket.io';

@WebSocketGateway()
export class AppGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  private logger: Logger = new Logger('AppGateway');

  handleDisconnect(client: Socket) {
    this.logger.log('Socket gateway DISCONNECTED!' + client.id);
  }

  handleConnection(client: Socket, ...args: any[]) {
    this.logger.log('Socket gateway CONNECTED!' + client.id);
  }

  afterInit(server: any) {
    this.logger.log('Socket gateway initialized');
  }

  @SubscribeMessage('messagetoServer')
  handleMessage(client: Socket, text: string): WsResponse<string> {
    return { event: 'messagetoClient', data: text };
  }
}
