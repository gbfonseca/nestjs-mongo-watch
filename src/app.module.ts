import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CatsModule } from './modules/cats/cats.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://127.0.0.1:27021/cats?replicaSet=dbrs&readPreference=primary&directConnection=true&ssl=false'),
    CatsModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
