import { Model, } from 'mongoose';
import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Cat, CatDocument } from './cat.schema';
import { CreateCatDto } from './dto/create-cat.dto';
import { DataType } from './types/DataType';
import { CatsGateway } from './cats.gateway';

@Injectable()
export class CatsService implements OnModuleInit {
  constructor(@InjectModel(Cat.name) private catModel: Model<CatDocument>, private readonly catsGateway: CatsGateway) { }
  private logger: Logger = new Logger('Database Changes')

  onModuleInit() {
    this.catModel.watch().on('change', (data: DataType) => {
      this.logger.log('Change data')
      this.catsGateway.broadcastAll(data.fullDocument)
      // this.catsGateway.server.to(data.fullDocument.user_id).emit('catsClient', { data: data.fullDocument })
    })
  }

  async create(createCatDto: CreateCatDto): Promise<Cat> {
    const createdCat = new this.catModel(createCatDto);
    return createdCat.save();
  }

  async findAll(): Promise<Cat[]> {
    return this.catModel.find().exec();
  }

  async findByUserId(_id: any): Promise<Cat[]> {
    return this.catModel.find({ user_id: _id }).exec();
  }

}
