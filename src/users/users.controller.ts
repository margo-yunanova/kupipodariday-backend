import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Headers,
} from "@nestjs/common";
import { UsersService } from "./users.service";
import { UpdateUserDto } from "./dto/update-user.dto";
import { FindUsersDto } from "./dto/find-users.dto";

@Controller("users")
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // response UserProfileResponseDto
  @Get("me")
  getOwnProfile(@Headers("authorization") authorization: string) {
    return this.usersService.findOne(authorization);
  }

  // response UserProfileResponseDto'
  // '400': description: Ошибка валидации переданных значений
  @Patch("me")
  updateOwnProfile(
    @Headers("authorization") authorization: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.usersService.update(authorization, updateUserDto);
  }

  // response Wish[]
  @Get("me/wishes")
  getOwnWishes(@Headers("authorization") authorization: string) {
    return this.usersService.getOwnWishes(authorization);
  }

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
