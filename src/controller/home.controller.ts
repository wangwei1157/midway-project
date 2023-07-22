import { Controller, Get, Inject, Post, Body, Files, Fields } from '@midwayjs/core';

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

  @Post('/upload')
  async upload(@Body() body, @Files() files, @Fields() fields) {
    /*
    files = [
      {
        filename: 'test.pdf',        // 文件原名
        data: '/var/tmp/xxx.pdf',    // mode 为 file 时为服务器临时文件地址
        fieldname: 'test1',          // 表单 field 名
        mimeType: 'application/pdf', // mime
      },
      {
        filename: 'test.pdf',        // 文件原名
        data: ReadStream,    // mode 为 stream 时为服务器临时文件地址
        fieldname: 'test2',          // 表单 field 名
        mimeType: 'application/pdf', // mime
      },
      // ...file 下支持同时上传多个文件
    ]

    */
    console.log(files, fields,body);

    return {
      files,
      fields
    }
  }
}
