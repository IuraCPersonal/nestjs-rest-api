import {
  ConflictException,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ClientSession, Model, Schema as MongooseSchema } from 'mongoose';
import { CreateUserDto } from 'src/modules/user/dto/createUser.dto';
import { User } from 'src/schemas/user.schema';
import { HashService } from 'src/modules/user/hash.service';

export class UserRepository {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<User>,
    private hashService: HashService,
  ) {}

  async createUser(createUserDto: CreateUserDto, session: ClientSession) {
    let user = await this.getUserByEmail(createUserDto.email);

    if (user) {
      throw new ConflictException('User Already Exists.');
    }

    user = new this.userModel({
      name: createUserDto.name,
      email: createUserDto.email,
      password: await this.hashService.hashPassword(createUserDto.password),
    });

    try {
      user = await user.save({ session });
    } catch (error) {
      throw new InternalServerErrorException(error);
    }

    if (!user) {
      throw new ConflictException('User Was Not Created.');
    }

    return user;
  }

  async getUserById(id: MongooseSchema.Types.ObjectId) {
    let user: any;

    try {
      user = await this.userModel.findById({ _id: id });
    } catch (error) {
      throw new InternalServerErrorException(error);
    }

    if (!user) {
      throw new NotFoundException('User Not Found.');
    }

    return user;
  }

  async getUserByEmail(email: string) {
    let user: any;

    try {
      user = await this.userModel
        .findOne({ email }, 'name email password')
        .exec();
    } catch (error) {
      throw new InternalServerErrorException(error);
    }

    return user;
  }
}
