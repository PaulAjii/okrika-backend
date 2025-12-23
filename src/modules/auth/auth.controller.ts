import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiConflictResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { SYSTEM_MESSAGES } from 'src/common/constants/system-messages.constant';
import { Public } from 'src/common/decorators/public.decorator';

@Public()
@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  @ApiOkResponse({ description: SYSTEM_MESSAGES.AUTH.REGISTER })
  @ApiOperation({ summary: 'Registers a new user' })
  @ApiConflictResponse({ description: SYSTEM_MESSAGES.AUTH.USER_EXIST })
  @ApiBadRequestResponse({ description: 'All fields are required' })
  @ApiBody({ type: RegisterDto, description: 'User registration data' })
  async register(@Body() registerDto: RegisterDto) {
    return this.authService.register(registerDto);
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ description: SYSTEM_MESSAGES.AUTH.LOGIN })
  @ApiOperation({ summary: 'Logs in a user' })
  @ApiUnauthorizedResponse({
    description: SYSTEM_MESSAGES.AUTH.INVALID_CREDENTIALS,
  })
  @ApiBadRequestResponse({ description: SYSTEM_MESSAGES.AUTH.EMPTY_FIELDS })
  @ApiBody({ type: LoginDto, description: 'User login data' })
  async login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }
}
