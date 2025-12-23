import {
  Injectable,
  ConflictException,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import * as bcrypt from 'bcrypt';
import { SYSTEM_MESSAGES } from 'src/common/constants/system-messages.constant';
import { formatSysMessage } from 'src/common/utils/formatSysMessage.util';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  private generateToken(user: any) {
    const payload = { sub: user.id, email: user.email, role: user.role };
    const accessToken = this.jwtService.sign(payload);
    return accessToken;
  }

  async register(registerDto: RegisterDto) {
    const existingUser = await this.usersService.getUserByEmail(
      registerDto.email,
    );

    if (existingUser) {
      throw new ConflictException(
        formatSysMessage(SYSTEM_MESSAGES.AUTH.USER_EXIST, registerDto.email),
      );
    }

    const hashedPassword = await bcrypt.hash(registerDto.password, 10);
    const newUser = await this.usersService.createUser({
      ...registerDto,
      password: hashedPassword,
    });
    const accessToken = this.generateToken(newUser);

    return {
      data: {
        accessToken,
        user: newUser,
      },
      message: SYSTEM_MESSAGES.AUTH.REGISTER,
    };
  }

  async login(loginDto: LoginDto) {
    const user = await this.usersService.validateUserForLogin(loginDto.email);

    if (!user || !(await bcrypt.compare(loginDto.password, user.password))) {
      throw new UnauthorizedException(SYSTEM_MESSAGES.AUTH.INVALID_CREDENTIALS);
    }

    const accessToken = this.generateToken(user);

    return {
      data: {
        accessToken,
        user,
      },
      message: SYSTEM_MESSAGES.AUTH.LOGIN,
    };
  }
}
