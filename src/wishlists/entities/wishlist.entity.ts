import { IsUrl, Length } from "class-validator";
import { User } from "src/users/entities/user.entity";
import { Wish } from "src/wishes/entities/wish.entity";
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

// список вишлистов
@Entity()
export class Wishlist {
  @PrimaryGeneratedColumn()
  id: number;

  @Length(1, 250)
  @Column()
  name: string;

  @Length(0, 1500)
  @Column({ length: 1500 })
  description: string;

  @IsUrl()
  @Column()
  image: string;

  @Column("simple-array")
  items: string[];

  @ManyToMany(() => Wish, (wish) => wish.id)
  @JoinTable()
  wishes: Wish[];

  @OneToOne(() => User, (user) => user.id)
  user: string;

  @OneToOne(() => User, (user) => user.id)
  wish: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
