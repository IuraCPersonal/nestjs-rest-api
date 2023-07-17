import { Injectable } from '@nestjs/common';
import { ClientSession, Schema as MongooseSchema } from 'mongoose';
import { CreateUserDto } from './dto/createUser.dto';
import { UserRepository } from 'src/repositories/user.repository';

@Injectable()
export class UsersService {
  constructor(private readonly userRepository: UserRepository) { }

  async createUser(createUserDto: CreateUserDto, session: ClientSession) {
    const createdUser = this.userRepository.createUser(createUserDto, session);
    return createdUser;
  }

  async getUserByUsername(username: string) {
    return await this.userRepository.getUserByUsername(username);
  }

  async getUserById(id: MongooseSchema.Types.ObjectId) {
    return await this.userRepository.getUserById(id);
  }
}
