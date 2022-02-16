import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Cat, CatSchema } from './cat.schema';
import { CatsService } from './cats.service';
import { CatsController } from './cats.controller';
import { CatsGateway } from './cats.gateway';

@Module({
  imports: [MongooseModule.forFeature([{ name: Cat.name, schema: CatSchema }])],
  providers: [CatsGateway, CatsService],
  controllers: [CatsController]
})
export class CatsModule { }
