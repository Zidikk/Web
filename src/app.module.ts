import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { PostModule } from './post/post.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import * as dotenv from 'dotenv';
import { AppGateway } from './app.gateway';
import { QuoteModule } from './quote/quote.module';
import { CommentModule } from './comment/comment.module';

dotenv.config();

@Module({
  imports: [
    UserModule,
    PostModule,
    QuoteModule,
    CommentModule,
    TypeOrmModule.forRoot({
      url: process.env.DATABASE_URL,
      type: 'postgres',
      host: 'dpg-ch44sndgk4qaf3m58ge0-a.frankfurt-postgres.render.com',
      database: 'web_lab',
      username: 'web_lab_user',
      password: 'IkqQS7W6m4iy6nGYSspUfdd3V8plqC5M',
      port: 5432,
      entities: ['dist/**/**/entity/*.entity{.js,.ts}'],
      synchronize: true,
      ssl: true,
      extra: { ssl: { rejectUnauthorized: false } },
      autoLoadEntities: true,
    }),
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService, AppGateway],
})
export class AppModule {}
