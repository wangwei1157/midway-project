import { Controller, Get, Inject, Post, Body, Files, Fields } from '@midwayjs/core';
import { Context } from '@midwayjs/koa';
import { PhotoService } from '../service/photo.service'

@Controller('/')
export class HomeController {
  @Inject()
  ctx: Context

  @Inject()
  photoService: PhotoService

  @Get('/')
  async home(): Promise<string> {
    return 'Hello Midwayjs!';
  }

  @Post('/savePhoto')
  async savePhoto(@Body() body: any): Promise<any> {
    console.log(body);
    const result = await this.photoService.savePhoto(body);
    console.log(result);

    return {
      success: true,
      data: result,
      msg: null
    };
  }

  @Get('/findPhoto')
  async findPhoto(@Body() body: any): Promise<any> {
    // function getImageBase64(blob) {
    //   return new Promise((resolve, reject) => {
    //     const reader = new FileReader();
    //     reader.readAsDataURL(blob);
    //     reader.onload = () => {
    //       const base64 = reader.result;
    //       resolve(base64);
    //     }
    //     reader.onerror = error => reject(error);
    //   });
    // }

    const result = await this.photoService.findPhotos() as any;
    // return {
    //   success: true,
    //   data: result,
    //   msg: null
    // }

    const data = new Buffer(result, 'binary').toString('base64');
    return data
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

    const result = await this.photoService.savePhoto(files);
    console.log(result);
    console.log(this.ctx.files);

    console.log(files, fields, body);

    return {
      files,
      fields
    }
  }
}
