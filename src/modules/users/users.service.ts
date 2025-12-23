import { Injectable } from '@nestjs/common';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { SYSTEM_MESSAGES } from 'src/common/constants/system-messages.constant';
import { Logger } from '@nestjs/common';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  logger = new Logger(UsersService.name);
  /**
   * @description a function that returns all the users in a database
   * @returns user[] an array of users in the database
   */
  async getUsers() {
    const users = await this.userRepository.find();

    if (!users || users.length === 0) {
      this.logger.log(SYSTEM_MESSAGES.USER.NOT_FOUND);
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
    return await this.userRepository.findOne({ where: { email } });
  }

  async validateUserForLogin(email: string) {
    const query = this.userRepository
      .createQueryBuilder('user')
      .where('user.email = :email', { email })
      .addSelect('user.password');

    return await query.getOneOrFail();
  }

  async createUser(userData: Partial<User>) {
    const user = this.userRepository.create(userData);
    return this.userRepository.save(user);
  }
}
