import { Inject, Controller, Get, Query, Post, Body } from '@midwayjs/core';
import { Context } from '@midwayjs/koa';
import { UserService } from '../service/user.service';

@Controller('/api')
export class APIController {
  @Inject()
  ctx: Context;

  @Inject()
  userService: UserService;

  @Get('/get_user')
  async getUser(@Query('uid') uid) {
    const user = await this.userService.getUser({ uid });
    // try {
    //   const a = JSON.parse(null)
    //   this.ctx.status = 200
    // } catch (error) {
    //   this.ctx.status = 500;
    //   return error;
    // }
    return { success: true, message: 'OK', data: { user, total: 10 } };
  }
  @Post('/get_user')
  async getUserPost(@Body() obj) {
    await setTimeout(() => { }, 2000)
    const user = await this.userService.getUser({ uid: obj.test });
    // try {
    //   const a = JSON.parse(null)
    //   this.ctx.status = 200
    // } catch (error) {
    //   this.ctx.status = 500;
    //   return error;
    // }
    return { success: true, message: 'OK', data: { user, total: 10 } };
  }
}
