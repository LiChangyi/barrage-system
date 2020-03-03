import { Schema, Document, Model, model } from 'mongoose';
import { md5 } from '../utils';

export interface IUser extends Document {
  username: string;
  nickname: String;
  password: string;
  role: string;
}

const userSchema: Schema = new Schema({
  username: {
    type: String,
    required: true
  },
  nickname: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    default: 'user'
  }
});

userSchema.pre('validate', function (this: IUser, next: any) {
  // 密码进行 加密
  this.password = md5(this.password);
  next();
});

export const User: Model<IUser> = model<IUser>('user', userSchema);
