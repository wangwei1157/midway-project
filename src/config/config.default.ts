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
} as MidwayConfig;
