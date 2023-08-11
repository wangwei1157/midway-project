import { Rule, RuleType } from '@midwayjs/validate';

export class DishDTO {

  @Rule(RuleType.string().required())
  name: string;

  @Rule(RuleType.string().required())
  dishImg: string;

  @Rule(RuleType.string())
  desc: string;

  @Rule(RuleType.number())
  views: number;
}