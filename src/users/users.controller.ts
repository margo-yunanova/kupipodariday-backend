import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  UseGuards,
  Request,
} from "@nestjs/common";
import { UsersService } from "./users.service";
import { UpdateUserDto } from "./dto/update-user.dto";
import { FindUsersDto } from "./dto/find-users.dto";
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";

@Controller("users")
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // response UserProfileResponseDto
  @UseGuards(JwtAuthGuard)
  @Get("me")
  getOwnProfile(@Request() req) {
    return req.user;
  }

  // response UserProfileResponseDto'
  // '400': description: Ошибка валидации переданных значений
  @UseGuards(JwtAuthGuard)
  @Patch("me")
  updateOwnProfile(@Request() req, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.updateUser(req.user.id, updateUserDto);
  }

  // // response Wish[]
  // @UseGuards(JwtAuthGuard)
  // @Get("me/wishes")
  // getOwnWishes() {
  //   return this.usersService.getOwnWishes();
  // }

  // response UserProfileResponseDto
  @Post("find")
  findUser(@Body() findUsersDto: FindUsersDto) {
    return this.usersService.findUser(findUsersDto.query);
  }

  // response UserPublicProfileResponseDto
  @Get(":username")
  getUserByUsername(@Param("username") username: string) {
    return this.usersService.findByUsername(username);
  }

  // response UserWishesDto[]
  @Get(":username/wishes")
  getWishesByUsername(@Param("username") username: string) {
    return this.usersService.getUserWishes(username);
  }
}
