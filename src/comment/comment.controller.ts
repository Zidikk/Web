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
import { CommentService } from './comment.service';
import { CommentDto } from './model/comment.dto';
import { QuoteEntity } from '../quote/model/entity/quote.entity';

@ApiTags('Comment')
@Controller('quote/:id/comment')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @ApiOperation({
    summary: 'creation new comment',
  })
  @ApiResponse({
    status: 201,
    description: 'Comment was successfully created',
  })
  @ApiResponse({
    status: 403,
    description: 'Forbidden create new comment ',
  })
  @Post()
  createComment(@Body() dto: CommentDto) {
    return this.commentService.createComment(dto);
  }

  @ApiOperation({
    summary: 'getting comments for quote',
  })
  @ApiResponse({
    status: 200,
    description: 'Comments was successfully get',
  })
  @ApiResponse({
    status: 403,
    description: 'Forbidden get comments ',
  })
  @Get()
  getAllComments(quote: QuoteEntity) {
    return this.commentService.getAllComments(quote);
  }

  @ApiOperation({
    summary: 'deletion comment',
  })
  @ApiResponse({
    status: 202,
    description: 'Post was successfully deleted',
  })
  @ApiResponse({
    status: 403,
    description: 'Forbidden deletion post',
  })
  @Delete(':commentID')
  deletePost(@Param('commentID') id: number) {
    this.commentService.deleteComment(id);
  }

  @ApiOperation({
    summary: 'update comment',
  })
  @ApiResponse({
    status: 202,
    description: 'Comment was successfully updated',
  })
  @ApiResponse({
    status: 403,
    description: 'Forbidden update comment',
  })
  @Put(':commentID')
  updateComment(@Param('commentID') id: number, @Body() dto: CommentDto) {
    this.commentService.updateComment(id, dto);
  }
}
