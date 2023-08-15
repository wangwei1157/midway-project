import { MidwayConfig } from '@midwayjs/core';
// import { uploadWhiteList } from '@midwayjs/upload';
import { EverythingSubscriber } from '../event/subscriber';
import { tmpdir } from 'os';
import { join } from 'path';
export default {
  // use for cookie sign key, should change to your own and keep security
  keys: '1688098078042_8299',
  koa: {
    port: 7001,
  },
  view: {
    defaultViewEngine: 'nunjucks',
  },
  jwt: {
    secret: 'setscrew',
    expiresIn: 60 * 60 * 24,
  },
  app: {
    security: {
      prefix: ['/api', '/dish'],         // 指定已/api开头的接口地址需要拦截
      ignore: ['/api/login', '/api/user/create'], // 指定该接口地址，不需要拦截
    },
  },
  redis: {
    client: {
      host: '119.91.208.237',
      port: 6379,
      password: 'ww1157606081',
      db: 0,
    },
  },
  cos: {
    client: {
      SecretId: 'AKIDGOJ3bz83mL9mCZpz1veBTWMzOYTSHvMj',
      SecretKey: 'JgqlTzIQMCsLG3f5OYeZLJ90hGgu0vdA',
    },
  },
  // swagger配置
  swagger: {
    title: 'midway-boot',
    description: 'Midway脚手架',
    auth: {
      authType: 'bearer',
    },
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
        subscribers: [EverythingSubscriber],
        // 配置实体模型
        // entities: [Photo],

        // 或者扫描形式
        entities: [
          '**/entity/*.entity{.ts,.js}'
        ]
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
  upload: {
    // mode: UploadMode, 默认为file，即上传到服务器临时目录，可以配置为 stream
    mode: 'file',
    // fileSize: string, 最大上传文件大小，默认为 10mb
    fileSize: '10mb',
    // whitelist: string[]，文件扩展名白名单
    whitelist: null,
    // uploadWhiteList.filter(ext => ext !== '.pdf'),
    // 仅允许下面这些文件类型可以上传
    // 您也可以使用 @midwayjs/upload 组件提供的 DefaultUploadFileMimeType 变量，
    // 作为默认的 MIME 校验规则，它提供了常用的 .jpg、.png、.psd 等文件扩展名的 MIME 数据
    // mimeTypeWhiteList: DefaultUploadFileMimeType,
    // mimeTypeWhiteList: {
    //   '.jpg': 'image/jpeg',
    //   // 也可以设置多个 MIME type，比如下面的允许 .jpeg 后缀的文件是 jpg 或者是 png 两种类型
    //   '.jpeg': ['image/jpeg', 'image/png'],
    //   // 其他类型
    //   '.gif': 'image/gif',
    //   '.bmp': 'image/bmp',
    //   '.wbmp': 'image/vnd.wap.wbmp',
    //   '.webp': 'image/webp',
    // },
    // tmpdir: string，上传的文件临时存储路径
    tmpdir: join(tmpdir(), 'midway-upload-files'),
    // cleanTimeout: number，上传的文件在临时目录中多久之后自动删除，默认为 5 分钟
    cleanTimeout: 5 * 60 * 1000,
    // base64: boolean，设置原始body是否是base64格式，默认为false，一般用于腾讯云的兼容
    base64: false,
    // 仅在匹配路径到 /api/upload 的时候去解析 body 中的文件信息
    match: /\/upload/,
  },
  i18n: {
    // 把你的翻译文本放到这里
    localeTable: {
      zh_CN: {
        validate: {
          'string.max': 'hello world',
        },
      },
    },
  },
} as MidwayConfig;
