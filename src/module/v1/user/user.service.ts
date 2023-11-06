import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './user.schema';
import { Model } from 'mongoose';
import { CreateUserDto } from './user.dto';
import { comparePassword, hashPassword } from 'src/common/utils/helper';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async getUserById(id: string): Promise<UserDocument> {
    return await this.userModel.findOne({ _id: id }).exec();
  }

  async getUserWithEmailAndPassword(
    email: string,
  ): Promise<UserDocument | null> {
    return await this.userModel.findOne({ email }).select('+password').exec();
  }

  async createUser(payload: CreateUserDto): Promise<UserDocument> {
    const { name, email, password } = payload;

    const emailExists = await this.userModel.findOne({ email }).exec();

    if (emailExists) {
      throw new BadRequestException('Email already exists');
    }

    const user = await this.userModel.create({
      name,
      email,
      password: await hashPassword(password),
    });

    return user;
  }

  async validateUser(email: string, password: string): Promise<UserDocument> {
    const user = await this.userModel
      .findOne({ email })
      .select('+password')
      .exec();

    if (!user) {
      throw new BadRequestException('User not found');
    }

    const passwordMatch = await comparePassword(password, user.password);

    if (!passwordMatch) {
      throw new BadRequestException('Invalid credentials');
    }

    return user;
  }
}
