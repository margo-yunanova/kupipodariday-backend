import { OmitType } from "@nestjs/swagger";
import { IsNumber, IsDate } from "class-validator";
import { CreateUserDto } from "./create-user.dto";

export class UserProfileDto extends OmitType(CreateUserDto, [
  "password",
  "email",
] as const) {
  @IsNumber()
  id: number;

  @IsDate()
  createdAt: Date;

  @IsDate()
  updatedAt: Date;
}
