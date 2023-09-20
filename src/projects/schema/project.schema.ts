import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({
  timestamps: true,
})
export class Project {
  @Prop()
  readonly name: string;

  @Prop()
  readonly createdBy: string;

  @Prop()
  readonly members: string[];
}

export const ProjectSchema = SchemaFactory.createForClass(Project);
