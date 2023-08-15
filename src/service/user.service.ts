import { Provide } from '@midwayjs/decorator';
import { User } from '../entity/user.entity';
import { InjectEntityModel } from '@midwayjs/typeorm';
import { Repository } from 'typeorm';
import { BaseService } from '../common/BaseService';

@Provide()
export class UserService extends BaseService<User> {

  @InjectEntityModel(User)
  model: Repository<User>;

  getModel(): Repository<User> {
    return this.model;
  }

  async findByUsername(username: string): Promise<User> {
    console.log(username);
    try {

      const res = await this.model.findOne({ where: { username } })
      console.log(res);
      return res;
    } catch (error) {
      console.log(error);

    }

  }

}