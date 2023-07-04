import { MidwayConfig } from '@midwayjs/core';
import { Photo } from '../entity/photo.entity';
export default {
  // use for cookie sign key, should change to your own and keep security
  keys: '1688098078042_8299',
  koa: {
    port: 7001,
  },
  view: {
    defaultViewEngine: 'nunjucks',
  },
  typeorm: {
    dataSource: {
      default: {
        /**
         * 单数据库实例
         */
        type: 'mysql',
        host: '119.91.208.237',
        port: 3306,
        username: 'ww_test',
        password: 'ww1157606081',
        database: 'ww_test',
        synchronize: false,     // 如果第一次使用，不存在表，有同步的需求可以写 true，注意会丢数据
        logging: false,

        // 配置实体模型
        entities: [Photo],

        // 或者扫描形式
        // entities: [
        //   '**/entity/*.entity{.ts,.js}'
        // ]
      }
    }
  },
  jsonp: {
    callback: 'jsonp',
    limit: 512,
  },
  cors: {
    credentials: false,
    // // 允许跨域的方法，【默认值】为 GET,HEAD,PUT,POST,DELETE,PATCH
    // allowMethods: string | string[];
    // // 设置 Access-Control-Allow-Origin 的值，【默认值】会获取请求头上的 origin
    // // 也可以配置为一个回调方法，传入的参数为 request，需要返回 origin 值
    // // 例如：http://test.midwayjs.org
    // // 如果设置了 credentials，则 origin 不能设置为 *
    // origin: string | Function;
    // // 设置 Access-Control-Allow-Headers 的值，【默认值】会获取请求头上的 Access-Control-Request-Headers
    // allowHeaders: string | string[];
    // // 设置 Access-Control-Expose-Headers 的值
    // exposeHeaders: string | string[];
    // // 设置 Access-Control-Allow-Credentials，【默认值】false
    // // 也可以配置为一个回调方法，传入的参数为 request，返回值为 true 或 false
    // credentials: boolean | Function;
    // // 是否在执行报错的时候，把跨域的 header 信息写入到 error 对的 headers 属性中，【默认值】false
    // keepHeadersOnError: boolean;
    // // 设置 Access-Control-Max-Age
    // maxAge: number;
  },
} as MidwayConfig;
