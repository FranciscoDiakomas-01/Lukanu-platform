import { ApiProperty } from '@nestjs/swagger';
import {
  IsInt,
  IsNotEmpty,
  IsObject,
  IsOptional,
  IsString,
  IsUrl,
  Max,
  Min,
  MinLength,
} from 'class-validator';

export class UpdateEbookDto {
  @ApiProperty()
  @IsString({
    message: 'Título inválido',
  })
  @IsNotEmpty({
    message: 'Título inválido',
  })
  @MinLength(5, {
    message: 'Título inválido , deve conter nomínimo 5 carácter',
  })
  title: string;
  @ApiProperty()
  @IsString({
    message: 'Subtitulo inválido',
  })
  @IsNotEmpty({
    message: 'Subtitulo inválido',
  })
  @MinLength(5, {
    message: 'Subtitulo inválido , deve conter nomínimo 5 carácter',
  })
  subtitle: string;
  @ApiProperty()
  @IsString({
    message: 'Descrição inválido',
  })
  @IsNotEmpty({
    message: 'Descrição inválido',
  })
  @MinLength(10, {
    message: 'Descrição inválido , deve conter nomínimo 5 carácter',
  })
  description: string;
  @ApiProperty()
  @IsString({
    message: 'Link da capa inválido',
  })
  @IsNotEmpty({
    message: 'Link da capa inválido',
  })
  @IsUrl(undefined, {
    message: 'Link da capa inválido',
  })
  coverUrl: string;
  @ApiProperty()
  @IsString({
    message: 'Link da livro inválido',
  })
  @IsNotEmpty({
    message: 'Link da livro inválido',
  })
  @IsUrl(undefined, {
    message: 'Link da livro inválido',
  })
  fileURl: string;
  @ApiProperty()
  @IsObject({
    message: 'Objecto inválido',
  })
  @IsOptional()
  metaData: object;
  @ApiProperty()
  @IsInt({
    message: 'Preço inválido',
  })
  @Min(50, {
    message: 'Preço mínimo , 50',
  })
  currentPrice: number;
  @ApiProperty()
  @IsInt({
    message: 'Percntagem da pamabla vai de 1 á 100',
  })
  @IsOptional({
    message: 'Percntagem da pamabla vai de 1 á 100',
  })
  @Min(1, {
    message: 'Percntagem da pamabla vai de 1 á 100',
  })
  @Max(100, {
    message: 'Percntagem da pamabla vai de 1 á 100',
  })
  sharePercent: number;
  @ApiProperty()
  @IsInt({
    message: 'Número de páginas , inválido',
  })
  @Min(1, {
    message: 'Número de páginas inválido',
  })
  @IsNotEmpty({
    message: 'Número de páginas , inválido',
  })
  pages: number;
  @ApiProperty()
  @IsString({
    message: 'Categoria inválida',
  })
  @IsNotEmpty({
    message: 'Categoria inválida',
  })
  category: string;
  @ApiProperty()
  @IsInt({
    message: 'Edição , inválido',
  })
  @Min(1, {
    message: 'Edição inválido',
  })
  @IsNotEmpty({
    message: 'Edição , inválido',
  })
  edition: number;
}
