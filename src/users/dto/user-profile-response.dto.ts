import { IsEmail } from "class-validator";
import { UserProfileDto } from "./user-profile.dto";

export class UserProfileResponseDto extends UserProfileDto {
  @IsEmail()
  email: string;
}
