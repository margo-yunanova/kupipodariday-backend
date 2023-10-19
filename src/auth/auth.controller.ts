import { Body, Controller, Request, Post, UseGuards } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { CreateUserDto } from "src/users/dto/create-user.dto";
import { UsersService } from "src/users/users.service";
import { LocalAuthGuard } from "./local-auth.guard";

@Controller()
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private usersService: UsersService,
  ) {}

  // response SigninUserResponseDto
  // '401': description: Некорректная пара логин и пароль
  // TODO тип request
  //@Public()
  @UseGuards(LocalAuthGuard)
  @Post("signin")
  async signIn(@Request() req) {
    // метод получает имя и пароль из тела, а затем возвращает JWT токен если юзер аутентифицирован
    return this.authService.login(req.user);
  }

  // response SignupUserResponseDto
  // '409': description: Пользователь с таким email или username уже зарегистрирован
  //@Public()
  @Post("signup")
  async signup(@Body() createUserDto: CreateUserDto) {
    const user = await this.usersService.createUser(createUserDto);
    /* При регистрации создаём пользователя и генерируем для него токен */
    return this.authService.login(user);
  }
}
