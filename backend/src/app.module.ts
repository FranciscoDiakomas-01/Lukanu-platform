import { Module } from '@nestjs/common';
import { UsersModule } from './domain/users/users.module';
import { WalletsModule } from './domain/wallets/wallets.module';
import { CoursesModule } from './domain/courses/courses.module';
import { LessonsModule } from './domain/lessons/lessons.module';
import { SubscriptionsModule } from './domain/subscriptions/subscriptions.module';
import { EbookModule } from './domain/ebook/ebook.module';
import { PurchaseModule } from './domain/purchase/purchase.module';
import { NoficationsModule } from './domain/nofications/nofications.module';
import { QuizModule } from './domain/quiz/quiz.module';
import { QuestionsModule } from './domain/questions/questions.module';
import { QuizresponseModule } from './domain/quizresponse/quizresponse.module';
import { ChatModule } from './domain/chat/chat.module';
import { AuthModule } from './domain/auth/auth.module';
import ConfiguratinModule from '@infra/config/config.module';
import PrismaModule from '@infra/database/prisma.module';
import CacheModule from '@infra/cache/cahe.module';
import { JwtModule } from '@nestjs/jwt';
import { BcryptModule } from '@core/services/bcrypt/bcrypt.module';
@Module({
  imports: [
    ConfiguratinModule,
    PrismaModule,
    CacheModule,
    UsersModule,
    WalletsModule,
    CoursesModule,
    LessonsModule,
    SubscriptionsModule,
    EbookModule,
    PurchaseModule,
    NoficationsModule,
    QuizModule,
    QuestionsModule,
    QuizresponseModule,
    ChatModule,
    AuthModule,
    JwtModule.register({
      global: true,
      secret: (process.env.JWT_SECRET as string) ?? '1234567890',
    }),
    BcryptModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
