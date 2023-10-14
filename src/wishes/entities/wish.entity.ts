import { IsString, Length, IsUrl } from "class-validator";
import { Wishlist } from "src/wishlists/entities/wishlist.entity";
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

//Список желаемых подарков
@Entity()
export class Wish {
  @PrimaryGeneratedColumn()
  id: number;

  @Length(1, 250)
  @IsString()
  @Column()
  name: string;

  @IsUrl()
  @Column()
  link: string;

  @IsUrl()
  @Column()
  image: string;

  @Column({ type: "decimal", precision: 2 })
  price: number;

  @Column({ type: "decimal", precision: 2 })
  raised: number;

  @IsUrl()
  @Column()
  owner: string;

  @Length(1, 1024)
  @IsString()
  @Column({ length: 1024 })
  description: string;

  @Column("simple-array")
  offers: string[];

  @Column()
  copied: number;

  @ManyToMany(() => Wishlist, (wishlist) => wishlist.id)
  wishList: Wishlist[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
