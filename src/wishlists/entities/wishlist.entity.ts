import { IsString, IsUrl, Length } from "class-validator";
import { UserPublicProfileResponseDto } from "src/users/dto/user-public-profile-response.dto";
import { User } from "src/users/entities/user.entity";
import { Wish } from "src/wishes/entities/wish.entity";
import { WishPartial } from "src/wishes/entities/wish-partial.entity";
import {
  Column,
  CreateDateColumn,
  Entity,
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

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Length(1, 250)
  @Column()
  name: string;

  @IsString()
  @Length(0, 1500)
  @Column()
  description: string;

  @IsUrl()
  @Column()
  image: string;

  @Column()
  @OneToOne(() => User, (user) => user.id)
  owner: number;

  @OneToMany(() => Wish, (wish) => wish.id)
  @Column("simple-array")
  items: WishPartial[];
}
