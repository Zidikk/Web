import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommentService } from './comment.service';
import { CommentEntity } from './model/entity/comment.entity';
import { CommentController } from './comment.controller';
import { QuoteModule } from '../quote/quote.module';

@Module({
  imports: [TypeOrmModule.forFeature([CommentEntity]), QuoteModule],
  providers: [CommentService],
  controllers: [CommentController],
})
export class CommentModule {}
