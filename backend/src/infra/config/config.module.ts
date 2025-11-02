import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import EnvSchema from './config.schema';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validate(env: any) {
        try {
          const validation = EnvSchema.parse(env);
          return validation;
        } catch (error) {
          throw error;
        }
      },
    }),
  ],
})
export default class ConfiguratinModule {}
