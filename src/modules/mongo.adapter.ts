import { IoAdapter } from '@nestjs/platform-socket.io';
import { MongoClient } from 'mongodb';
import { ServerOptions } from 'socket.io';
import { createAdapter } from "@socket.io/mongo-adapter";

const pubClient = new MongoClient("mongodb://127.0.0.1:27021/cats?replicaSet=dbrs&readPreference=primary&directConnection=true&ssl=false");
const mongoAdapter = createAdapter({ pubClient });

export class MongoIoAdapter extends IoAdapter {
  createIOServer(port: number, options?: ServerOptions): any {
    const server = super.createIOServer(port, options);
    server.adapter(mongoAdapter);
    return server;
  }
}