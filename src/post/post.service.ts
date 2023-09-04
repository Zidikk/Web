import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/user/model/entity/user.entity';
import { UserService } from 'src/user/user.service';
import { DeleteResult, Repository } from 'typeorm';
import { PostDto } from './model/post.dto';
import { PostEntity } from './model/entity/post.entity';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(PostEntity)
    private readonly postRepository: Repository<PostEntity>,
    private readonly userService: UserService,
  ) {}

  async createPost(dto: PostDto): Promise<PostEntity> {
    const post = new PostEntity();
    post.text = dto.text;
    post.user = await this.userService.getUserByID(dto.userID);

    return await this.postRepository.save(post);
  }

  getAllPosts(user: UserEntity): Promise<PostEntity[]> {
    return this.postRepository.find({ where: { user: user } }).then((posts) => {
      if (!posts) {
        throw new NotFoundException('post not found');
      }
      return posts;
    });
  }
  async deletePost(id: number): Promise<DeleteResult> {
    return await this.postRepository.delete(id);
  }

  async updatePost(id: number, dto: PostDto) {
    await this.postRepository.update(id, dto);
    return await this.postRepository.find({ where: { id: id } });
  }
}
