import { IsNotEmpty, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateProjectDto {
  @IsNotEmpty()
  @ApiProperty()
  readonly name: string;
  @IsOptional()
  @ApiProperty()
  readonly members: string[];
}
