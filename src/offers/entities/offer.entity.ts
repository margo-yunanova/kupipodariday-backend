import { IsUrl } from "class-validator";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Offer {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  user: string;

  @IsUrl()
  @Column()
  item: string;

  @Column({ type: "decimal", precision: 2 })
  amount: number;

  @Column()
  hidden: false;
}
