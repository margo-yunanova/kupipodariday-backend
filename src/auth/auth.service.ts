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

  async validateUser(signInUserDto: SignInUserDto) {
    const user = await this.usersService.findProfile(signInUserDto.username);
    const isMatch = await bcrypt.compare(signInUserDto.password, user.password);
    if (isMatch) {
      const { password, ...result } = user;
      return result;
    }

    return null;
  }
}
