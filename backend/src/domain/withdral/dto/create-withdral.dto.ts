import { ApiProperty } from '@nestjs/swagger';
import { STATUS } from '@prisma/client';
import {
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsPositive,
  IsString,
  IsUrl,
  Min,
} from 'class-validator';

export class CreateWithdralDto {
  @ApiProperty()
  @IsInt()
  @IsNotEmpty()
  @IsPositive()
  @Min(1000)
  amount: number;
}

export class UpdateWithdralDto {
  @ApiProperty({
    enum: STATUS,
  })
  @IsEnum(STATUS)
  @IsNotEmpty()
  status: STATUS;

  @IsString()
  @IsOptional()
  @IsUrl()
  file: string;
}
