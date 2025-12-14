import { Injectable } from '@nestjs/common';
import { SYSTEM_MESSAGES } from 'src/common/constants/system-messages.constant';

@Injectable()
export class UsersService {
  /**
   * @description a function that returns all the users in a database
   * @returns [string] a text showing what the function returns
   */
  getUsers(): string {
    return SYSTEM_MESSAGES.USER.GET_ALL;
  }
}
