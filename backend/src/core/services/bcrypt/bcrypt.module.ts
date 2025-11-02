import { Global, Module } from '@nestjs/common';
import BcryptService from './bcrypt.service';

@Module({
  providers: [BcryptService],
  exports: [BcryptService],
})
@Global()
export class BcryptModule {}
