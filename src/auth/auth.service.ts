import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from "bcrypt";
import { User } from "../users/entities/user.entity";
import { UsersService } from "../users/users.service";
import { SignInUserDto } from "./dto/signin-user.dto";

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async login(user: User) {
    // Note: we choose a property name of sub to hold our userId value to be consistent with JWT standards.
    const payload = { username: user.username, sub: user.id };
    // sing - генерирует jwt из свойств user
    return { access_token: this.jwtService.sign(payload) };
  }

  /*WARNING
Of course in a real application, you wouldn't store a password in plain text. You'd instead use a library like bcrypt, with a salted one-way hash algorithm. With that approach, you'd only store hashed passwords, and then compare the stored password to a hashed version of the incoming password, thus never storing or exposing user passwords in plain text. To keep our sample app simple, we violate that absolute mandate and use plain text. Don't do this in your real app!*/
  async validateUser(signInUserDto: SignInUserDto) {
    const user = await this.usersService.findByUsername(signInUserDto.username);
    const isMatch = await bcrypt.compare(signInUserDto.password, user.password);
    if (isMatch) {
      const { password, ...result } = user;
      console.log("AuthService validateUser", result);
      return result;
    }

    return null;
  }
}
