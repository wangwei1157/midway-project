import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('dish')
export class Dish {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column('text')
  desc: string;

  @Column('double')
  views: number;

  @Column()
  dishImg: string;
}
