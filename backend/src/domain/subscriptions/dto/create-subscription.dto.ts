import { ApiProperty } from '@nestjs/swagger';
import { STATUS } from '@prisma/client';
import {
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsPositive,
  IsString,
  IsUrl,
} from 'class-validator';

export class CreateSubscriptionDto {
  @ApiProperty()
  @IsInt()
  @IsNotEmpty()
  @IsPositive()
  courseId: number;
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @IsUrl()
  file: string;
}

export class UpdateSubscriptionDTo {
  @ApiProperty({
    enum: STATUS,
  })
  @IsEnum(STATUS)
  @IsNotEmpty()
  status: STATUS;
}
