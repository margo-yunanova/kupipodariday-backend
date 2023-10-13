import { IsUrl, Length } from "class-validator";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Wishlist {
  @PrimaryGeneratedColumn()
  id: number;

  @Length(1, 250)
  @Column()
  name: string;

  @Length(0, 1500)
  @Column()
  description: string;

  @IsUrl()
  @Column()
  image: string;

  @Column("simple-array")
  items: string[];
}
