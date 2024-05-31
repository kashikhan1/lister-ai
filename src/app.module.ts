import { Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { ArticlesModule } from './articles/articles.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { GoogleStrategy } from './auth/google.strategy';
import { MailModule } from './mail/mail.module';
import { ToolsModule } from './tools/tools.module';
import { CategoriesModule } from './categories/categories.module';
import { SubcategoriesModule } from './subcategories/subcategories.module';
import { BookmarksModule } from './bookmarks/bookmarks.module';
import { TagsModule } from './tags/tags.module';
import { FaqsModule } from './faqs/faqs.module';
import { SubscribersModule } from './subscribers/subscribers.module';
import { ChatsModule } from './chats/chats.module';

@Module({
  imports: [
    PrismaModule,
    ArticlesModule,
    UsersModule,
    AuthModule,
    MailModule,
    ToolsModule,
    CategoriesModule,
    SubcategoriesModule,
    BookmarksModule,
    TagsModule,
    FaqsModule,
    SubscribersModule,
    ChatsModule,
  ],
  controllers: [AppController],
  providers: [AppService, GoogleStrategy],
})
export class AppModule implements NestModule {
  configure() {
    // Apply to the specific route
  }
}
