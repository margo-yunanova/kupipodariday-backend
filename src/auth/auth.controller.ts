import { Body, Controller, Request, Post, UseGuards } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { CreateUserDto } from "src/users/dto/create-user.dto";
import { UsersService } from "src/users/users.service";
import { LocalAuthGuard } from "./local-auth.guard";
import { SigninUserResponseDto } from "./dto/signin-user-response.dto";

@Controller()
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private usersService: UsersService,
  ) {}

  @UseGuards(LocalAuthGuard)
  @Post("signin")
  async loginUser(@Request() req): Promise<SigninUserResponseDto> {
    // метод получает имя и пароль из тела, а затем возвращает JWT токен если юзер аутентифицирован
    return this.authService.loginUser(req.user);
  }

  @Post("signup")
  async registerUser(@Body() createUserDto: CreateUserDto) {
    const user = await this.usersService.registerUser(createUserDto);
    /* При регистрации создаём пользователя и генерируем для него токен */
    return this.authService.loginUser(user);
  }
}
