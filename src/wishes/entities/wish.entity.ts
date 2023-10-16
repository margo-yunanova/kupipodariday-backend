import { IsString, Length, IsUrl, Min } from "class-validator";
import { Offer } from "src/offers/entities/offer.entity";
import { UserPublicProfileResponseDto } from "src/users/dto/user-public-profile-response.dto";
import { User } from "src/users/entities/user.entity";
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  OneToOne,
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
  @Column({ type: "decimal", precision: 2 })
  price: number;

  @Min(1)
  @Column({ type: "decimal", precision: 2 })
  raised: number;

  @Column()
  copied: number;

  @Length(1, 1024)
  @IsString()
  @Column({ length: 1024 })
  description: string;

  @OneToOne(() => User, (user) => user.id)
  @Column()
  owner: UserPublicProfileResponseDto;

  @OneToMany(() => Offer, (offer) => offer.id)
  offers: Offer[];
}
