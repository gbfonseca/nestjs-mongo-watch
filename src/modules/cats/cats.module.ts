import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Cat, CatSchema } from './cat.schema';
import { CatsService } from './cats.service';
import { CatsController } from './cats.controller';

@Module({
  imports: [MongooseModule.forFeature([{ name: Cat.name, schema: CatSchema }])],
  providers: [CatsService],
  controllers: [CatsController]
})
export class CatsModule { }
