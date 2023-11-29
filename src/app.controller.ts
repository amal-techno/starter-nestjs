import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('live-kit-room')
  createLiveKitRoom(@Body() param: any): any {
    return this.appService._createRoom(param);
  }

  @Post('live-kit-token')
  getLiveKitToken(@Body() param: any): any {
    return this.appService._getLiveKitToken(param);
  }

  @Get('live-kit-url')
  getLiveKitUrl(){
    return this.appService._getLiveKitUrl();
  }

}
