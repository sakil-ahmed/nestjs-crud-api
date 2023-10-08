import {IsEnum, IsNotEmpty, IsOptional, IsString} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export enum status {
  TODO = 'todo',
  PENDING = 'pending',
  IN_PROGRESS = 'in_progress',
  DONE = 'done',
}

export class CreateTaskDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  readonly title: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  readonly description: string;

  @IsEnum(status)
  @IsOptional()
  @ApiProperty()
  readonly status: string;


  @IsNotEmpty()
  @ApiProperty()
  readonly categoryId: string;
}
