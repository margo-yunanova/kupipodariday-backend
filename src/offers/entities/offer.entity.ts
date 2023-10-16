import { IsDate } from "class-validator";
import { User } from "src/users/entities/user.entity";
import { Wish } from "src/wishes/entities/wish.entity";
import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Offer {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "decimal", precision: 2 })
  amount: number;

  @Column({ default: false })
  hidden: boolean;

  @IsDate()
  createdAt: Date;

  @IsDate()
  updatedAt: Date;

  @OneToOne(() => Wish, (wish) => wish.id)
  item: string;

  @OneToOne(() => User, (user) => user.id)
  user: string;
}
