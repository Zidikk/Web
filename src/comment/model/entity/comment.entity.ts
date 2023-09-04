import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { QuoteEntity } from '../../../quote/model/entity/quote.entity';

@Entity('Comment')
export class CommentEntity {
  @PrimaryGeneratedColumn()
  quoteID: number;

  @Column()
  text: string;

  @ManyToOne(() => QuoteEntity, (quote) => quote.comments)
  quote: QuoteEntity;
}
