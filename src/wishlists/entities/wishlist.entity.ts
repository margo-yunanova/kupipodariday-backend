import { IsString, IsUrl, Length } from "class-validator";
import { User } from "src/users/entities/user.entity";
import { Wish } from "src/wishes/entities/wish.entity";
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

// список вишлистов
@Entity()
export class Wishlist {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Length(1, 250)
  @Column()
  name: string;

  @IsString()
  @Length(0, 1500)
  @Column({ nullable: true })
  description: string;

  @IsUrl()
  @Column()
  image: string;

  @ManyToOne(() => User, (user) => user.wishlists)
  owner: User;
  // TODO поменять связь
  @OneToMany(() => Wish, (wish) => wish.wishlist)
  items: Wish[];
}
