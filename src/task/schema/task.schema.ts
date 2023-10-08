import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import {Document} from "mongoose";

@Schema({
  timestamps: true,
  versionKey:false,
})
export class Task extends Document{
  @Prop()
  readonly title: string;

  @Prop()
  readonly description: string;

  @Prop()
  readonly status: string;

  @Prop()
  readonly categoryId: string;

  @Prop()
  readonly createdBy: string;

}

export const TaskSchema = SchemaFactory.createForClass(Task);
