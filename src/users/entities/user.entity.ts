import { IsNotEmpty, IsString, Length, IsEmail, IsUrl } from "class-validator";
import { Offer } from "src/offers/entities/offer.entity";
import { Wish } from "src/wishes/entities/wish.entity";
import { Wishlist } from "src/wishlists/entities/wishlist.entity";
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Length(2, 30)
  @IsNotEmpty()
  @IsString()
  @Column({ unique: true })
  username: string;

  @Length(2, 200)
  @IsString()
  @Column({ default: "Пока ничего не рассказал о себе" })
  about: string;

  @IsUrl()
  @Column({ default: "https://i.pravatar.cc/300" })
  avatar: string;

  @IsEmail()
  @IsNotEmpty()
  @Column({ unique: true, select: false })
  email: string;

  @IsNotEmpty()
  @IsString()
  @Column({ select: false })
  password: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  // список желаемых подарков
  @OneToMany(() => Wish, (wish) => wish.owner)
  wishes: Wish[];

  // содержит список подарков, на которые скидыватся пользователь
  @OneToMany(() => Offer, (offer) => offer.user)
  offers: Offer[];

  // список вишлистов, которые создал пользователь
  @OneToMany(() => Wishlist, (wishlist) => wishlist.id)
  wishlists: Wishlist[];
}
