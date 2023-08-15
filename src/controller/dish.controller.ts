import { Controller, Get, Inject, Post, Body, Files } from '@midwayjs/core';
import { Context } from '@midwayjs/koa';
import { DishService } from '../service/dish.service'
import { DishDTO } from '../dto/dish';
import { UploadDTO } from '../api/dto/CommonDTO'
import { ApiBearerAuth, ApiBody, BodyContentType } from '@midwayjs/swagger';

@ApiBearerAuth()
@Controller('/dish')
export class HomeController {
  @Inject()
  ctx: Context

  @Inject()
  dishService: DishService

  @Get('/')
  async home(): Promise<string> {
    return 'Hello Midwayjs!';
  }

  @Post('/saveDish')
  async saveDish(@Body() body: DishDTO): Promise<any> {
    try {
      // console.log(body);
      await this.dishService.saveDish(body);
      return {
        success: true,
        data: null,
        msg: '新增成功'
      };
    } catch (error) {
      return {
        success: false,
        data: error,
        msg: null
      }
    }
  }

  @Get('/qryDish')
  async qryDish(@Body() body: any): Promise<any> {
    try {
      const result = await this.dishService.qryDish() as any;
      return {
        success: true,
        data: result,
        msg: null
      }
    } catch (error) {
      return {
        success: false,
        data: error,
        msg: null
      }
    }
  }

  @Get('/hotDish')
  async hotDish() {
    try {
      const result = await this.dishService.hotDish() as any;
      return {
        success: true,
        data: result,
        msg: null
      }
    } catch (error) {
      return {
        success: false,
        data: error,
        msg: null
      }
    }
  }


  @Post('/upload', { summary: '图片上传' })
  @ApiBody({
    contentType: BodyContentType.Multipart
  })
  async upload(@Body() body: any, @Files() files: UploadDTO) {
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

    console.log(body);
    console.log(files);


    let result
    try {
      result = await this.dishService.uploadDish(files);
      return {
        success: true,
        data: result,
        msg: '上传成功'
      }
    } catch (error) {
      console.log(error);

      return {
        success: false,
        data: error,
        msg: '服务器异常'
      }
    }
  }
}
