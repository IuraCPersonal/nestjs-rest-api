import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { User, UserSchema } from 'src/schemas/user.schema';
import { UserRepository } from 'src/repositories/user.repository';
import { HashService } from './hash.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  controllers: [UsersController],
  providers: [UsersService, HashService, UserRepository],
  exports: [UsersService, HashService, UserRepository],
})
export class UsersModule {}
