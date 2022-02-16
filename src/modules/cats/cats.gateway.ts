import { Logger } from '@nestjs/common';
import { OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({
  cors: { allowedHeaders: '*' },
})
export class CatsGateway implements OnGatewayConnection, OnGatewayInit, OnGatewayDisconnect {

  constructor(
  ) { }

  @WebSocketServer() server: Server;
  private logger: Logger = new Logger('CatsGateway')

  token: string = ''

  afterInit(server: any) {
    this.logger.log('Initialized!')
  }
  handleDisconnect(client: any) {
    this.logger.log('Disconnected!')
  }

  handleConnection(client: any, ...args: any[]) {
    this.logger.log('Connected!')
    this.token = client.handshake.query.token;
  }

  async broadcastAll(data: any): Promise<any> {
    this.server.to(data.user_id).emit('catsClient', data)
  }

  @SubscribeMessage('joinRoom')
  handleJoinRoom(client: Socket) {
    const token = client.handshake.query.token
    client.join(token)
    client.emit('joinedRoom', token)
  }

}
