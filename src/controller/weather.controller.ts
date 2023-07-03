import { Controller, Get, Query, Inject } from '@midwayjs/core';
// import { WeatherInfo } from '../interface';
import { WeatherService } from '../service/weather.service';
import { Context } from '@midwayjs/koa';

@Controller('/')
export class WeatherController {

  @Inject()
  weatherService: WeatherService;

  @Inject()
  ctx: Context;

  @Get('/weather')
  async getWeatherInfo(@Query('cityId') cityId: string): Promise<any> {
    // if (!cityId) {
    //   return {
    //     success: false,
    //     data: null,
    //     msg: 'cityId不能为空',
    //   };
    // }
    const result = await this.weatherService.getWeather(cityId)
    if (result) {
      await this.ctx.render('info', result.weatherinfo);
    }
    console.log(result);

    return {
      success: false,
      data: result,
      msg: null,
    };
  }
}
