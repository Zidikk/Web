import {
  Column,
  Entity,
  ManyToMany,
  PrimaryGeneratedColumn,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { UserEntity } from '../../../user/model/entity/user.entity';
import { CommentEntity } from '../../../comment/model/entity/comment.entity';

@Entity('Quote')
export class QuoteEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  text: string;

  @ManyToMany(() => UserEntity, (user) => user.quotes)
  users: UserEntity[];

  @JoinColumn()
  @OneToMany(() => CommentEntity, (comment) => comment.quote)
  comments: CommentEntity[];
}
