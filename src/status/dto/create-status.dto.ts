import { IsHexColor, IsNotEmpty, isString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateStatusDto {
  @IsNotEmpty()
  @ApiProperty()
  readonly name: string;

  @IsNotEmpty()
  @ApiProperty()
  readonly slug: string;

  @IsNotEmpty()
  @IsHexColor()
  @ApiProperty()
  readonly color: string;
}
