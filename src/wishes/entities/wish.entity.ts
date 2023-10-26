import { IsString, Length, IsUrl, Min } from "class-validator";
import { Offer } from "src/offers/entities/offer.entity";
import { User } from "src/users/entities/user.entity";
import { Wishlist } from "src/wishlists/entities/wishlist.entity";
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

//Список желаемых подарков
@Entity()
export class Wish {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

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

  @Min(1)
  @Column({ type: "decimal", precision: 10, scale: 2 })
  price: number;

  @Column({ type: "decimal", precision: 10, scale: 2, default: 0 })
  raised: number;

  @Column({ default: 0 })
  copied: number;

  @Length(1, 1024)
  @IsString()
  @Column({ length: 1024 })
  description: string;

  @ManyToOne(() => User, (user) => user.wishes)
  owner: User;

  @OneToMany(() => Offer, (offer) => offer.item)
  offers: Offer[];

  @ManyToMany(() => Wishlist, (wishlist) => wishlist.items)
  wishlist: Wishlist;
}
