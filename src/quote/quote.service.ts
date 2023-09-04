import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { QuoteEntity } from './model/entity/quote.entity';
import { QuoteDto } from './model/quote.dto';

@Injectable()
export class QuoteService {
  constructor(
    @InjectRepository(QuoteEntity)
    private readonly quoteRepository: Repository<QuoteEntity>,
  ) {}

  async createQuote(dto: QuoteDto): Promise<QuoteEntity> {
    const quote = new QuoteEntity();
    quote.text = dto.text;
    return await this.quoteRepository.save(quote);
  }

  async getQuotes(): Promise<QuoteEntity[]> {
    return this.quoteRepository.find();
  }

  getQuoteByID(id: number): Promise<QuoteEntity> {
    return this.quoteRepository.findOneBy({ id }).then((quote) => {
      if (!quote) {
        throw new NotFoundException('quote not found');
      }
      return quote;
    });
  }

  async deleteQuote(id: number): Promise<DeleteResult> {
    return await this.quoteRepository.delete(id);
  }

  async updateQuote(id: number, dto: QuoteDto) {
    await this.quoteRepository.update(id, dto);
    return await this.quoteRepository.find({ where: { id: id } });
  }
}
