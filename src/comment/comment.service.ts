import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { CommentEntity } from './model/entity/comment.entity';
import { QuoteService } from '../quote/quote.service';
import { QuoteEntity } from '../quote/model/entity/quote.entity';
import { CommentDto } from './model/comment.dto';

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(CommentEntity)
    private readonly commentRepository: Repository<CommentEntity>,
    private readonly quoteService: QuoteService,
  ) {}

  async createComment(dto: CommentDto): Promise<CommentEntity> {
    const comment = new CommentEntity();
    comment.text = dto.text;
    comment.quote = await this.quoteService.getQuoteByID(dto.quoteID);

    return await this.commentRepository.save(comment);
  }

  getAllComments(quote: QuoteEntity): Promise<CommentEntity[]> {
    return this.commentRepository
      .find({ where: { quote: quote } })
      .then((posts) => {
        if (!posts) {
          throw new NotFoundException('post not found');
        }
        return posts;
      });
  }
  async deleteComment(id: number): Promise<DeleteResult> {
    return await this.commentRepository.delete(id);
  }

  async updateComment(id: number, dto: CommentDto) {
    await this.commentRepository.update(id, dto);
    return await this.commentRepository.find({ where: { quoteID: id } });
  }
}
