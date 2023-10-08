import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import {Document} from "mongoose";

@Schema({ timestamps: true , versionKey:false })
export class Category extends Document{
  @Prop()
  readonly name: string;

  @Prop()
  readonly color: string;

  @Prop()
  readonly slug: string;

  @Prop()
  readonly createdBy: string;

}

export const CategorySchema = SchemaFactory.createForClass(Category);
