import { ObjectId } from "mongoose";
import { Timestamp } from "rxjs";

export type DataType = {
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
    user_id: string
  }
}