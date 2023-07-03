import { Controller, Get, Inject, Post, Body } from '@midwayjs/core';

import { PhotoService } from '../service/photo.service'

@Controller('/')
export class HomeController {

  @Inject()
  photoService: PhotoService

  @Get('/')
  async home(): Promise<string> {
    return 'Hello Midwayjs!';
  }

  @Post('/savePhoto')
  async savePhoto(@Body() body: any): Promise<any> {
    console.log(body);
    const result = await this.photoService.findPhotos();
    console.log(result);

    return {
      success: true,
      data: result,
      msg: null
    };
  }
}
