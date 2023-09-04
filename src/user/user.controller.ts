import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Render,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UserDto } from './model/user.dto';
import { UserService } from './user.service';

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiOperation({
    summary: 'creation new user',
  })
  @ApiResponse({
    status: 201,
    description: 'User was successfully created',
  })
  @ApiResponse({
    status: 403,
    description: 'Forbidden create new user ',
  })
  @Post()
  createUser(@Body() dto: UserDto) {
    this.userService.createUser(dto);
  }

  @ApiOperation({
    summary: 'get user',
  })
  @ApiResponse({
    status: 200,
    description: 'User was successfully get',
  })
  @ApiResponse({
    status: 403,
    description: 'User not founded',
  })
  @Render('userPage')
  @UseGuards(AuthGuard('jwt'))
  @Get(':email')
  async getUser(@Param('email') email: string) {
    return await this.userService.getUserByEmail(email);
  }
  @ApiOperation({
    summary: 'deleting a user',
  })
  @ApiResponse({
    status: 202,
    description: 'User was successfully deleted',
  })
  @ApiResponse({
    status: 403,
    description: 'Forbidden deletion user',
  })
  @Delete(':email')
  deleteUser(@Param('email') email: string) {
    return this.userService.deleteUser(email);
  }

  @ApiOperation({
    summary: 'update user',
  })
  @ApiResponse({
    status: 202,
    description: 'User was successfully updated',
  })
  @ApiResponse({
    status: 403,
    description: 'Forbidden update user',
  })
  @Put(':id')
  updateUser(@Param('id') id: number, @Body() dto: UserDto) {
    this.userService.updateUser(id, dto);
  }
}
