import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
import {
  IsEmpty,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsPositive,
} from 'class-validator';

export class CreateAfiliateDto {
  @ApiProperty()
  @IsInt()
  @IsPositive()
  @IsNotEmpty()
  productId: number;

  @ApiHideProperty()
  @IsOptional()
  @IsEmpty()
  userId: number;
}
