import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UserEntity } from 'src/user/model/entity/user.entity';
import { PostDto } from './model/post.dto';
import { PostService } from './post.service';

@ApiTags('Post')
@Controller('user/:email/post')
export class PostController {
  constructor(private readonly postsService: PostService) {}
  @ApiOperation({
    summary: 'creation new post',
  })
  @ApiResponse({
    status: 201,
    description: 'Post was successfully created',
  })
  @ApiResponse({
    status: 403,
    description: 'Forbidden create new post ',
  })
  @Post()
  createPost(@Body() dto: PostDto) {
    return this.postsService.createPost(dto);
  }

  @ApiOperation({
    summary: 'getting all post for user',
  })
  @ApiResponse({
    status: 200,
    description: 'Post was successfully get',
  })
  @ApiResponse({
    status: 403,
    description: 'Forbidden get post ',
  })
  @Get()
  getAllPosts(user: UserEntity) {
    return this.postsService.getAllPosts(user);
  }

  @ApiOperation({
    summary: 'deletion post',
  })
  @ApiResponse({
    status: 202,
    description: 'Post was successfully deleted',
  })
  @ApiResponse({
    status: 403,
    description: 'Forbidden deletion post',
  })
  @Delete(':id')
  deletePost(@Param('id') id: number) {
    this.postsService.deletePost(id);
  }

  @ApiOperation({
    summary: 'update post',
  })
  @ApiResponse({
    status: 202,
    description: 'Post was successfully updated',
  })
  @ApiResponse({
    status: 403,
    description: 'Forbidden update post',
  })
  @Put(':id')
  updatePost(@Param('id') id: number, @Body() dto: PostDto) {
    this.postsService.updatePost(id, dto);
  }
}
