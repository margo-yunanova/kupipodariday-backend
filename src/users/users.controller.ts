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
import { Request as IRequest } from "express";
import { UserProfileResponseDto } from "./dto/user-profile-response.dto";

interface RequestWithUserProp extends IRequest {
  user: UserProfileResponseDto;
}

@Controller("users")
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // response UserProfileResponseDto
  @UseGuards(JwtAuthGuard)
  @Get("me")
  getOwnProfile(@Request() req: RequestWithUserProp) {
    return req.user;
  }

  // response UserProfileResponseDto'
  // '400': description: Ошибка валидации переданных значений
  @UseGuards(JwtAuthGuard)
  @Patch("me")
  updateOwnProfile(@Request() req, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.updateUser(req.user.id, updateUserDto);
  }

  // // response Wish[]Entry
  // @UseGuards(JwtAuthGuard)
  // @Get("me/wishes")
  // getOwnWishes() {
  //   return this.usersService.getOwnWishes();
  // }

  // response UserProfileResponseDto
  @UseGuards(JwtAuthGuard)
  @Post("find")
  findUser(@Body() findUsersDto: FindUsersDto) {
    return this.usersService.findMany(findUsersDto.query);
  }

  // response UserPublicProfileResponseDto
  @UseGuards(JwtAuthGuard)
  @Get(":username")
  async getUserByUsername(@Param("username") username: string) {
    const user = await this.usersService.findByUsername(username);
    // console.log(user);
    return user;
  }

  // response UserWishesDto[]
  @UseGuards(JwtAuthGuard)
  @Get(":username/wishes")
  async getWishesByUsername(@Param("username") username: string) {
    const user = await this.usersService.getUserWishes(username);
    return user;
  }
}
