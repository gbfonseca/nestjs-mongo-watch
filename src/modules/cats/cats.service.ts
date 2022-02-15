import { Model, ObjectId, } from 'mongoose';
import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Cat, CatDocument } from './cat.schema';
import { CreateCatDto } from './dto/create-cat.dto';
import { Timestamp } from 'rxjs';

type DataType = {
  _id: {
    _data: string
  },
  clusterTIme: Timestamp<{ t: number, i: number }>,
  ns: {
    db: string,
    coll: string
  },
  documentKey: {
    _id: ObjectId
  },

  fullDocument: {
    _id: ObjectId,
    age: number;
    name: string;
    breed: string
  }
}

@Injectable()
export class CatsService implements OnModuleInit {
  constructor(@InjectModel(Cat.name) private catModel: Model<CatDocument>) { }
  onModuleInit() {
    this.catModel.watch().on('change', (data: DataType) => {
      console.log(data.fullDocument)
    })
  }

  async create(createCatDto: CreateCatDto): Promise<Cat> {
    const createdCat = new this.catModel(createCatDto);
    return createdCat.save();
  }

  async findAll(): Promise<Cat[]> {
    return this.catModel.find().exec();
  }
}
