import { Injectable } from '@nestjs/common';
import { SYSTEM_MESSAGES } from './common/constants/system-messages.constant';
import { formatSysMessage } from './common/utils/formatSysMessage.util';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppService {
  constructor(private configService: ConfigService) {}
  welcome() {
    return {
      message: 'Welcome to our API Service!',
      data: {
        server: formatSysMessage(
          SYSTEM_MESSAGES.SERVER.STARTUP,
          this.configService.get<number>('port') as number,
        ),
        apiDocs: formatSysMessage(
          SYSTEM_MESSAGES.SERVER.API_DOC_STARTUP,
          this.configService.get<number>('port') as number,
        ),
        apiReference: formatSysMessage(
          SYSTEM_MESSAGES.SERVER.API_DOC_REFERENCE,
          this.configService.get<number>('port') as number,
        ),
      },
    };
  }
}
