import { IsNotEmpty, IsString, Length, IsEmail, IsUrl } from "class-validator";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Length(2, 30)
  @IsNotEmpty()
  @IsString()
  @Column({ unique: true })
  usermame: string;

  @Length(2, 200)
  @IsString()
  @Column({ default: "Пока ничего не рассказал о себе" })
  about: string;

  @IsUrl()
  @Column({ default: "https://i.pravatar.cc/300" })
  avatar: string;

  @IsEmail()
  @IsNotEmpty()
  @Column({ unique: true })
  email: string;

  @IsNotEmpty()
  @IsString()
  @Column()
  password: string;

  @Column()
  wishes: string;

  @Column()
  offers: string;

  @Column()
  wishlists: string;
}
