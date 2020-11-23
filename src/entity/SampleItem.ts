import {Entity, Column, PrimaryGeneratedColumn} from "typeorm";

@Entity()
export class SampleItem {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    length: 100
  })
  name: string
}
