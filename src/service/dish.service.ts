import { Provide, Inject } from '@midwayjs/core';
import { InjectEntityModel } from '@midwayjs/typeorm';
import { COSService } from '@midwayjs/cos';
import { Dish } from '../entity/dish.entity';
import { Repository } from 'typeorm';
import { DishDTO } from '../dto/dish';

@Provide()
export class DishService {
  @Inject()
  cosService: COSService;

  @InjectEntityModel(Dish)
  dishModel: Repository<Dish>;

  // save
  async saveDish(body: DishDTO) {
    let dish = new Dish();
    try {
      dish.dishImg = body.dishImg;
      dish.name = body.name
      dish.views = body.views || 1;
      dish.desc = body.desc;
      const dishResult = await this.dishModel.save(dish);
      console.log('dish id = ', dishResult.id);
    } catch (error) { }
  }

  async uploadDish(file: any[]) {
    try {
      const res = await this.cosService.uploadFile({
        Bucket: 'ww1157-1318984815',
        Region: 'ap-guangzhou',
        Key: file[0].filename,
        FilePath: file[0].data,
      });
      if (res.statusCode === 200) {
        return res.Location
      } else {
        return res
      }
    } catch (error) {
      return error
    }
  }
  async hotDish() {
    try {
      let result = await this.dishModel.createQueryBuilder('dish').orderBy('dish.views', 'DESC').take(3).getMany();
      // console.log('hot dish from the db: ', result);
      return result;
    } catch (error) {
      return error
    }
  }
  // find
  async qryDish() {
    try {
      let allDish = await this.dishModel.find();
      console.log('All dish from the db: ', allDish);
      return allDish;
    } catch (error) {
      return error
    }
    // find first
    // let firstPhoto = await this.dishModel.findOne({
    //     where: {
    //         id: 1
    //     }
    // });
    // console.log("First photo from the db: ", firstPhoto);

    // // find one by name
    // let meAndBearsPhoto = await this.dishModel.findOne({
    //     where: { name: "Me and Bears" }
    // });
    // console.log("Me and Bears photo from the db: ", meAndBearsPhoto);

    // // find by views
    // let allViewedPhotos = await this.dishModel.find({
    //     where: { views: 1 }
    // });
    // console.log("All viewed photos: ", allViewedPhotos);

    // let allPublishedPhotos = await this.dishModel.find({
    //     where: { isPublished: true }
    // });
    // console.log("All published photos: ", allPublishedPhotos);

    // // find and get count
    // let [allPhotos, photosCount] = await this.dishModel.findAndCount({});
    // console.log("All photos: ", allPhotos);
    // console.log("Photos count: ", photosCount);
  }
  async updatePhoto() {
    let photoToUpdate = await this.dishModel.findOne({
      where: {
        id: 1,
      },
    });
    photoToUpdate.name = 'Me, my friends and polar bears';

    await this.dishModel.save(photoToUpdate);
  }
  async deletePhoto() {
    /*...*/
    const photo = await this.dishModel.findOne({
      where: {
        id: 1,
      },
    });

    // 删除单个
    await this.dishModel.remove(photo);
    // 删除多个
    // await this.dishModel.remove([photo1, photo2, photo3]);

    // 按 id 删除
    await this.dishModel.delete(1);
    // await this.dishModel.delete([1, 2, 3]);
    // await this.dishModel.delete({ name: "Timber" });

    //软删除
    // await this.dishModel.softDelete(1);
    // // 使用 restore 方法恢复;
    // await this.dishModel.restore(1);
  }
}
