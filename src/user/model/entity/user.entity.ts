import { PostEntity } from 'src/post/model/entity/post.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  ManyToMany,
  JoinColumn,
  JoinTable,
} from 'typeorm';
import { QuoteEntity } from '../../../quote/model/entity/quote.entity';

@Entity('User')
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  passwordHash: string;

  @JoinColumn()
  @OneToMany(() => PostEntity, (post) => post.user)
  posts: PostEntity[];

  @JoinTable()
  @ManyToMany(() => QuoteEntity, (quote) => quote.users)
  quotes: QuoteEntity[];
}
