import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { ArticlesModule } from './articles/articles.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { GoogleStrategy } from './auth/google.strategy';
import { MailModule } from './mail/mail.module';

@Module({
  imports: [PrismaModule, ArticlesModule, UsersModule, AuthModule, MailModule],
  controllers: [AppController],
  providers: [AppService, GoogleStrategy],
})
export class AppModule {}
