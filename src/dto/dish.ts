import { ApiProperty } from '@midwayjs/swagger';
import { Rule, RuleType } from '@midwayjs/validate';

export class DishDTO {
  @Rule(RuleType.string().required())
  @ApiProperty(
    { example: 'test', description: '用户名' }
  )
  name: string;

  @Rule(RuleType.string().required())
  @ApiProperty(
    { example: 'test', description: '图片地址' }
  )
  dishImg: string;

  @Rule(RuleType.string())
  @ApiProperty(
    { example: 'test', description: '描述' }
  )
  desc: string;

  @Rule(RuleType.number())
  @ApiProperty(
    { example: 'test', description: '浏览量' }
  )
  views: number;
}
