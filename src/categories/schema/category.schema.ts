import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ timestamps: true })
export class Category {
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
