import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsPhoneNumber,
  IsString,
  IsStrongPassword,
  MinLength,
} from 'class-validator';

export class SignInDto {
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
  @ApiProperty()
  @IsString({
    message: 'Senha inválida',
  })
  @IsNotEmpty({
    message: 'Senha inválida',
  })
  @IsStrongPassword(undefined, {
    message: 'Senha muito fraca',
  })
  password: string;
}
