import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
import { LEVEL } from '@prisma/client';
import {
  IsEmpty,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsPositive,
  IsString,
  IsUrl,
  Min,
  MinLength,
} from 'class-validator';

export class CreateCourseDto {
  @ApiHideProperty()
  @IsEmpty()
  ownerId: number;
  @ApiProperty()
  @IsString({
    message: 'Título precisa ser texto',
  })
  @IsNotEmpty({
    message: 'Título precisa ser texto',
  })
  @MinLength(5, {
    message: 'Título precisa conter 5 carácter',
  })
  title: string;
  @ApiProperty()
  @IsString({
    message: 'Descrição precisa ser texto',
  })
  @IsNotEmpty({
    message: 'Descrição precisa ser texto',
  })
  @MinLength(10, {
    message: 'Descrição precisa conter 10 carácter',
  })
  description: string;
  @ApiProperty()
  @IsUrl(undefined, {
    message: 'Link do vídeo inválido',
  })
  @IsNotEmpty({
    message: 'Link do vídeo inválido',
  })
  videoURl: string;

  @ApiProperty()
  @IsString({
    message: 'Categoria precisa ser texto',
  })
  @IsNotEmpty({
    message: 'Categoria precisa ser texto',
  })
  @MinLength(5, {
    message: 'Categoria precisa conter 5 carácter',
  })
  category: string;

  @ApiProperty({
    enum: LEVEL,
  })
  @IsEnum(LEVEL, {
    message: 'Nível inválido',
  })
  @IsNotEmpty({
    message: 'Nível inválido',
  })
  level: LEVEL;

  @ApiProperty()
  @IsInt({
    message: 'Preço preccisa ser número',
  })
  @IsPositive({
    message: 'Preço mínimo 50',
  })
  @Min(50, {
    message: 'Preço mínimo 50',
  })
  price: number;

  @ApiProperty()
  @IsUrl(undefined, {
    message: 'Link do googleform inválido',
  })
  @IsOptional()
  formLink: string;
}
