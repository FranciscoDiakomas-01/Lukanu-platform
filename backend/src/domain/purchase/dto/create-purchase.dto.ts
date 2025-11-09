import { ApiProperty } from '@nestjs/swagger';
import { PAYSTATUS } from '@prisma/client';
import {
  IsBoolean,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsPositive,
  IsString,
  IsUrl,
} from 'class-validator';

export class CreatePurchaseDto {
  @IsInt()
  @IsNotEmpty()
  @ApiProperty()
  @IsPositive()
  ebookId: number;
  @IsString()
  @IsOptional()
  affCode?: string;
  @IsString()
  @ApiProperty()
  @IsUrl()
  fileUrl: string;
  @IsInt()
  @ApiProperty()
  @IsNotEmpty()
  @IsPositive()
  ownerId: number;
  @IsBoolean()
  @IsNotEmpty()
  @ApiProperty()
  digital: boolean;
}

export class UpdatePurchaseDto {
  @IsString()
  @IsOptional()
  description?: string;
  @ApiProperty({
    enum: PAYSTATUS,
  })
  @IsEnum(PAYSTATUS)
  @IsNotEmpty()
  status: PAYSTATUS;
}
