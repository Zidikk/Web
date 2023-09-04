import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { UserDto } from './model/user.dto';
import { UserEntity } from './model/entity/user.entity';

const bcrypt = require('bcrypt');

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async createUser(dto: UserDto): Promise<UserEntity> {
    this.userRepository
      .findOne({ where: { email: dto.email } })
      .then((user) => {
        if (user) {
          throw new ConflictException('user already exists');
        }
      });
    const user = new UserEntity();
    user.email = dto.email;
    user.passwordHash = await bcrypt.hash(dto.password, 10);
    return this.userRepository.save(user);
  }
  getUserByEmail(email: string): Promise<UserEntity> {
    return this.userRepository
      .findOne({
        where: { email: email },
        relations: ['posts'],
      })
      .then((user) => {
        if (!user) {
          throw new NotFoundException('user not found');
        }
        return user;
      });
  }

  getUserByID(id: number): Promise<UserEntity> {
    return this.userRepository.findOneBy({ id }).then((user) => {
      if (!user) {
        throw new NotFoundException('user not found');
      }
      return user;
    });
  }

  async deleteUser(email: string): Promise<DeleteResult> {
    return await this.userRepository.delete(await this.getUserIDByEmail(email));
  }

  getUserIDByEmail(email: string): Promise<number> {
    return this.userRepository
      .findOne({ where: { email: email } })
      .then((user) => {
        if (!user) {
          throw new NotFoundException('user not found');
        }
        return user.id;
      });
  }

  async updateUser(id: number, dto: UserDto) {
    await this.userRepository.update(id, dto);
    return await this.userRepository.find({ where: { id: id } });
  }
}
