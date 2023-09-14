import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({
  timestamps: true,
})
export class Task {
  @Prop()
  readonly title: string;

  @Prop()
  readonly description: string;

  @Prop()
  readonly status: string;
}

export const TaskSchema = SchemaFactory.createForClass(Task);
