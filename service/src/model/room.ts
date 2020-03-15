import { Schema, Document, Model, model } from 'mongoose';
import { IUser } from './user';

export interface IRoom extends Document {
  roomname: string;
  user: IUser;
  status: boolean;
}

const roomSchema: Schema = new Schema({
  roomname: {
    type: String,
    required: true
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'user'
  },
  status: {
    type: Boolean,
    default: false
  }
});

export const Room: Model<IRoom> = model<IRoom>('room', roomSchema);
