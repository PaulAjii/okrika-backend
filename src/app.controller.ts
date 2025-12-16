import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiTags, ApiOkResponse, ApiOperation } from '@nestjs/swagger';

@ApiTags('app')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @ApiOkResponse({ description: 'Welcome to our API service' })
  @ApiOperation({ summary: 'Welcomes and gets API details' })
  welcome() {
    return this.appService.welcome();
  }
}
