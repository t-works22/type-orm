import {Entity, Column, PrimaryGeneratedColumn} from "typeorm";

@Entity()
export class SampleBox {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    length: 100
  })
  name: string
}
