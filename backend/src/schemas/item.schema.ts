import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { User } from './user.schema';

export type ItemDocument = Item & Document;

@Schema({ timestamps: true })
export class Item {
  @Prop({ required: true, type: String })
  name: string;

  @Prop({ default: 'Draft' })
  status: string;

  @Prop({ required: true, type: Number })
  startPrice: number;

  @Prop({ type: Number, default: 0 })
  currentPrice: number;

  @Prop({ required: true, type: Date })
  duration: Date;

  @Prop({
    required: true,
    type: mongoose.Schema.Types.ObjectId,
    ref: User.name,
  })
  author: User;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: User.name,
  })
  currentBidder: User;
}

export const ItemSchema = SchemaFactory.createForClass(Item);
