import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { SYSTEM_MESSAGES } from 'src/common/constants/system-messages.constant';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}
  /**
   * @description a function that returns all the users in a database
   * @returns user[] an array of users in the database
   */
  async getUsers() {
    const users = await this.userRepository.find();

    if (!users || users.length === 0) {
      throw new NotFoundException(SYSTEM_MESSAGES.USER.NOT_FOUND);
    }

    return {
      message: SYSTEM_MESSAGES.USER.GET_ALL,
      data: users,
    };
  }

  /**
   * @description a function that finds a user by email and returns the user
   * @returns object the user found
   */
  async getUserByEmail(email: string) {
    const user = await this.userRepository.findOne({ where: { email } });

    if (!user) {
      throw new NotFoundException(SYSTEM_MESSAGES.USER.NOT_FOUND);
    }

    return {
      message: SYSTEM_MESSAGES.USER.FIND_ONE,
      data: user,
    };
  }
}
