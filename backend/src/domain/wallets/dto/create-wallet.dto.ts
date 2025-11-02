import { ApiProperty } from '@nestjs/swagger';
import { IsIBAN, IsNotEmpty, IsString, Matches } from 'class-validator';

export class CreateWalletDto {
  @ApiProperty()
  @IsNotEmpty({ message: 'IBAN é obrigatório' })
  @Matches(/^AO\d{2}\d{4}\d{4}\d{13}$/, {
    message: 'IBAN de Angola inválido',
  })
  @IsNotEmpty({
    message: 'Iban inválido',
  })
  iban: string;
  @ApiProperty()
  @IsString({
    message: 'Banco inválido',
  })
  @IsNotEmpty({
    message: 'Banco inválido',
  })
  bank: string;
}
