import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ItemDocument = Item & Document;

@Schema()
export class Item {
  @Prop({ required: true, type: String })
  name: string;

  @Prop({ required: true, default: 'On-going' })
  status: string;

  @Prop({ type: Number })
  startPrice: number;

  @Prop({ type: Number })
  currentPrice: number;

  @Prop({ type: Number })
  duration: number;
}

export const ItemSchema = SchemaFactory.createForClass(Item);
