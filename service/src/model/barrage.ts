import { Schema, Document, Model, model } from 'mongoose';
import { IUser } from './user';
import { IRoom } from './room';

export interface IBarrage extends Document {
  content: string;
  color?: string;
  user: IUser;
  room: IRoom;
  createAt?: string;
}

const barrageSchema: Schema = new Schema({
  content: {
    type: String,
    required: true
  },
  color: {
    type: String,
    default: ''
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'user',
    required: true
  },
  room: {
    type: Schema.Types.ObjectId,
    ref: 'room',
    required: true
  },
  createAt: {
    type: Date,
    default: Date.now
  }
});

export const Barrage: Model<IBarrage> = model<IBarrage>('barrage', barrageSchema);
