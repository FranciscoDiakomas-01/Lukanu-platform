import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsIBAN,
  IsNotEmpty,
  IsOptional,
  IsPhoneNumber,
  IsString,
  IsStrongPassword,
  IsUrl,
  MinLength,
} from 'class-validator';

export class UpdateUserDto {
  @ApiProperty()
  @IsNotEmpty({
    message: 'Iban inválido',
  })
  @IsString({
    message: 'Iban inválido',
  })
  iban: string;
  @ApiProperty()
  @IsString({
    message: 'banco inváido',
  })
  @IsOptional({
    message: 'banco inváido',
  })
  @MinLength(3, {
    message: 'banco inváido',
  })
  bank: string;
  @ApiProperty()
  @IsString({
    message: 'Nome inválido',
  })
  @IsNotEmpty({
    message: 'Nome inválido',
  })
  @MinLength(3, {
    message: 'Nome precisa ter 3 carácteres',
  })
  firstName: string;
  @ApiProperty()
  @IsString({
    message: 'Sobrenome inválido',
  })
  @IsNotEmpty({
    message: 'Sobrenome inválido',
  })
  @MinLength(3, {
    message: 'Sobrenome precisa ter 3 carácteres',
  })
  lastName: string;
  @ApiProperty()
  @IsEmail(undefined, {
    message: 'Email inválido',
  })
  @IsNotEmpty({ message: 'Email inválido' })
  email: string;
}

export class UpdateUserPassword {
  @ApiProperty()
  @IsString({
    message: 'Senha inválida',
  })
  @IsNotEmpty({
    message: 'Senha inválida',
  })
  odlPassword: string;
  @ApiProperty()
  @IsString({
    message: 'Nova Senha inválida',
  })
  @IsNotEmpty({
    message: 'Nova Senha inválida',
  })
  @IsStrongPassword(undefined, {
    message: 'Nova Senha muito fraca',
  })
  newPassWord: string;
}
