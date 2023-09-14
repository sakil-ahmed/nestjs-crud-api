import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export enum status {
  TODO = 'Todo',
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
  @IsNotEmpty()
  @ApiProperty()
  readonly status: string;
}
