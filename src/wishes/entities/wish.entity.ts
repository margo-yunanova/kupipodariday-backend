import { IsString, Length, IsUrl } from "class-validator";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Wish {
  @PrimaryGeneratedColumn()
  id: number;

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

  @Column({ type: "decimal", precision: 2 })
  price: number;

  @Column({ type: "decimal", precision: 2 })
  raised: number;

  @IsUrl()
  @Column()
  owner: string;

  @Length(1, 1024)
  @IsString()
  @Column()
  description: string;

  @Column("simple-array")
  offers: string[];

  @Column()
  copied: number;
}
