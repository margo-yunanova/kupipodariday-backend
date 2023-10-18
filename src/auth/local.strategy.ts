import { Strategy } from "passport-local";
import { PassportStrategy } from "@nestjs/passport";
import { Injectable, UnauthorizedException } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { SignInUserDto } from "./dto/signin-user.dto";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    // установка опция для специфической стратегии, например, для jwt стратегии можно предоставить secret to sign tokens
    super();
  }

  // "verify callback" - говорит Passport как взаимодействовать с user store (where you manage user accounts). Здесь верифицируется существует ли юзер (и\или создание нового юзера) и валидны ли его полномочия. Passport ожидает, что коллбэк вернует "полного" юзера, если валидация успешна, или null если нет.

  // For the local-strategy, Passport expects a validate() method with the following signature: validate(username: string, password:string): any

  //If a user is found and the credentials are valid, the user is returned so Passport can complete its tasks (e.g., creating the user property on the Request object), and the request handling pipeline can continue. If it's not found, we throw an exception and let our exceptions layer handle it.

  async validate(username: string, password: string) {
    const user = await this.authService.validateUser({ username, password });
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
