import { Controller, Get } from '@nestjs/common';
import { UsersService } from './users.service';
import {
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @ApiOkResponse({ description: 'All users fetched successfully' })
  @ApiNotFoundResponse({ description: 'No user found!' })
  @ApiOperation({ summary: 'Get all users' })
  findAll(): string {
    return this.usersService.getUsers();
  }
}
