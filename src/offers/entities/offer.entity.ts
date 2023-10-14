import { IsUrl } from "class-validator";
import { User } from "src/users/entities/user.entity";
import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Offer {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => User, (user) => user.id)
  user: string;

  @IsUrl()
  @Column()
  item: string;

  @Column({ type: "decimal", precision: 2 })
  amount: number;

  @Column()
  hidden: false;
}
