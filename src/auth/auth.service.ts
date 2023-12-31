import {
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schema/user.schema';
import { Model } from 'mongoose';
import { SignupDto } from './dto/signup.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<User>,
    private jwtService: JwtService,
  ) {}

  async signUp(signUpDto: SignupDto) {
    const { password, name, email } = signUpDto;
    const findUser = await this.userModel.findOne({email})
    if (findUser) {
      throw new ConflictException('Email already exists');
    }
    const hashedPassword = await bcrypt.hash(password, 10);


    console.log(findUser)
    const user = await this.userModel.create({
      name,
      email,
      password: hashedPassword,
    });
    return this.getToken(user);
  }

  async login(loginDto: LoginDto) {
    const { email, password } = loginDto;
    const user = await this.userModel.findOne({ email });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    const isPasswordMatched = await bcrypt.compare(password, user.password);
    if (!isPasswordMatched) {
      throw new UnauthorizedException('Invalid email or password');
    }
    return this.getToken(user);
  }

  async getToken(user: any) {
    const { _id, name, email, createdAt, updatedAt } = user;
    const accessToken = this.jwtService.sign({
      id: _id,
    });
    const refreshToken = this.jwtService.sign({
      id: _id,
    });
    return {
      accessToken,
      refreshToken,
      user: {
        id: _id,
        name,
        email,
        createdAt,
        updatedAt,
      },
    };
  }
}
