import { Schema, Document, Model, model } from 'mongoose';
import { IUser } from './user';

export interface IFilterRule extends Document {
  rule: string;
  user: IUser;
  status: boolean;
  createAt?: string;
}

const filterRuleSchema: Schema = new Schema({
  rule: {
    type: String,
    required: true
  },
  type: {
    type: String,
    enum: ['noDisplay', 'filterKey'],
    default: 'filterKey'
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'user'
  },
  status: {
    type: Boolean,
    default: false
  },
  createAt: {
    type: Date,
    default: Date.now
  }
});

export const FilterRule: Model<IFilterRule> = model<IFilterRule>('filterRule', filterRuleSchema);
