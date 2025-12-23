import { Controller, Get } from '@nestjs/common';
import { UsersService } from './users.service';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/common/decorators/roles.decorator';
import { UserRole } from 'src/common/constants/roles.enum';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Roles(UserRole.ADMIN)
  @Get()
  @ApiOkResponse({ description: 'All users fetched successfully' })
  @ApiOperation({ summary: 'Get all users' })
  async findAll() {
    return await this.usersService.getUsers();
  }
}
