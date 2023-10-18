import { Body, Controller, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { SignInUserDto } from "./dto/signin-user.dto";
import { CreateUserDto } from "src/users/dto/create-user.dto";
import { UsersService } from "src/users/users.service";

@Controller()
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private usersService: UsersService,
  ) {}

  // response SigninUserResponseDto
  // '401': description: Некорректная пара логин и пароль
  @Post("/signin")
  signIn(@Body() signInUserDto: SignInUserDto) {
    return { access_token: "1", signInUserDto };
  }
  // response SignupUserResponseDto
  // '409': description: Пользователь с таким email или username уже зарегистрирован
  @Post("/signup")
  async signup(@Body() createUserDto: CreateUserDto) {
    /* При регистрации создаём пользователя и генерируем для него токен */
    const user = await this.usersService.create(createUserDto);

    return { AuthController: "AuthController", ...user };
  }
}
