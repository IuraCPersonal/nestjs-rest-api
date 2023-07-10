import {
  BadRequestException,
  Body,
  Controller,
  HttpStatus,
  Post,
  Res,
  Get,
  Param,
} from '@nestjs/common';
import { Response } from 'express';
import { UsersService } from './users.service';
import { InjectConnection } from '@nestjs/mongoose';
import { Connection, Schema as MongooseSchema } from 'mongoose';
import { CreateUserDto } from './dto/createUser.dto';

@Controller('users')
export class UsersController {
  constructor(
    @InjectConnection()
    private readonly mongoConnection: Connection,
    private userService: UsersService,
  ) { }

  @Post('/createUser')
  async createUser(@Body() createUserDto: CreateUserDto, @Res() res: Response) {
    const session = await this.mongoConnection.startSession();
    session.startTransaction();

    try {
      const newUser: any = await this.userService.createUser(
        createUserDto,
        session,
      );

      await session.commitTransaction();

      return res.status(HttpStatus.CREATED).send(newUser);
    } catch (error) {
      await session.abortTransaction();
      throw new BadRequestException(error);
    } finally {
      session.endSession();
    }
  }

  @Get('/getUserById/:id')
  async getUserById(
    @Param('id') id: MongooseSchema.Types.ObjectId,
    @Res() res: Response,
  ) {
    const user: any = await this.userService.getUserById(id);
    return res.status(HttpStatus.OK).send(user);
  }
}
