import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({
  timestamps: true,
})
export class Status {
  @Prop()
  readonly name: string;

  @Prop()
  readonly slug: string;

  @Prop()
  readonly color: string;
}

export const StatusSchema = SchemaFactory.createForClass(Status);
