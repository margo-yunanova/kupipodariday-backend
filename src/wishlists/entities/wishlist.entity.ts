import { IsString, IsUrl, Length } from "class-validator";
import { User } from "src/users/entities/user.entity";
import { Wish } from "src/wishes/entities/wish.entity";
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
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

  // BUG ТЗ в схеме описании нет данного свойства, только в swagger
  @ManyToOne(() => User, (user) => user.wishlists)
  owner: User;

  @ManyToMany(() => Wish, (wish) => wish.wishlists)
  @JoinTable()
  items: Wish[];
}
