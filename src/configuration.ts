import { Configuration, App } from '@midwayjs/core';
import * as koa from '@midwayjs/koa';
import * as validate from '@midwayjs/validate';
import * as info from '@midwayjs/info';
import * as orm from '@midwayjs/typeorm';
import * as crossDomain from '@midwayjs/cross-domain';
import * as upload from '@midwayjs/upload';
import * as cos from '@midwayjs/cos';
import * as i18n from '@midwayjs/i18n';
import * as jwt from '@midwayjs/jwt';
import * as redis from '@midwayjs/redis';
import * as swagger from '@midwayjs/swagger';
import { join } from 'path';
import { DefaultErrorFilter } from './filter/default.filter';
import { NotFoundFilter } from './filter/notfound.filter';
import { ValidateErrorFilter } from './filter/validate.filter';
import { ReportMiddleware } from './middleware/report.middleware';
import { SecurityMiddleware } from './middleware/security.middleware';
import * as view from '@midwayjs/view-nunjucks';
// import { WeatherErrorFilter } from './filter/weather.filter';
@Configuration({
  imports: [
    koa,
    validate,
    view,
    orm,
    crossDomain,
    upload,
    cos,
    i18n,
    jwt,
    redis,
    swagger,
    // {
    //   component: swagger,
    //   enabledEnvironment: ['local']
    // },
    {
      component: info,
      enabledEnvironment: ['local'],
    },
    // swagger
  ],
  importConfigs: [join(__dirname, './config')],
})
export class ContainerLifeCycle {
  @App()
  app: koa.Application;

  async onReady() {
    // add middleware
    this.app.useMiddleware([SecurityMiddleware, ReportMiddleware]);
    // this.app.useFilter([ValidateErrorFilter]);
    // add filter
    this.app.useFilter([NotFoundFilter, DefaultErrorFilter, ValidateErrorFilter]);
  }
}
