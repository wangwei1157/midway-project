import { Provide, Inject } from '@midwayjs/core';
import { InjectEntityModel } from '@midwayjs/typeorm';
import { COSService } from '@midwayjs/cos';
import { Dish } from '../entity/dish.entity';
import { Repository } from 'typeorm';

@Provide()
export class PhotoService {
  @Inject()
  cosService: COSService;

  @InjectEntityModel(Dish)
  dishModel: Repository<Dish>;

  // save
  async saveDish(body: any) {
    let dish = new Dish();
    dish.views = 1;
    try {
      const res = await this.cosService.uploadFile({
        Bucket: 'ww1157-1318984815',
        Region: 'ap-guangzhou',
        Key: body[0].filename,
        FilePath: body[0].data,
      });
      if (res.statusCode === 200) {
        // save success
        dish.dishImg = res.Location;
        const dishResult = await this.dishModel.save(dish);
        console.log('dish id = ', dishResult.id);
      }
    } catch (error) {}
  }
  // find
  async findDish() {
    let allPhotos = await this.dishModel.find();
    console.log('All photos from the db: ', allPhotos);
    return allPhotos;
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
