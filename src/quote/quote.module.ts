import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from 'src/user/user.module';
import { QuoteService } from './quote.service';
import { QuoteController } from './quote.controller';
import { QuoteEntity } from './model/entity/quote.entity';

@Module({
  imports: [TypeOrmModule.forFeature([QuoteEntity]), UserModule],
  providers: [QuoteService],
  controllers: [QuoteController],
  exports: [QuoteService],
})
export class QuoteModule {}
