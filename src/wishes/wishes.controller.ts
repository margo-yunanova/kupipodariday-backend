import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from "@nestjs/common";
import { WishesService } from "./wishes.service";
import { CreateWishDto } from "./dto/create-wish.dto";
import { UpdateWishDto } from "./dto/update-wish.dto";

@Controller("wishes")
export class WishesController {
  constructor(private readonly wishesService: WishesService) {}

  // response схемы видимо нет
  @Post()
  getWishes(@Body() createWishDto: CreateWishDto) {
    return this.wishesService.create(createWishDto);
  }

  // response Wish[]
  @Get("last")
  getLastWish() {}
  Wish;

  // response Wish[]
  @Get("top")
  getTopWishes() {}

  // response Wish
  // swagger: id: number
  @Get(":id")
  getWishById(@Param("id") id: string) {}

  // response видимо ничего
  // swagger: id: number
  @Patch(":id")
  updateWishById(
    @Param("id") id: string,
    @Body() updateWishDto: UpdateWishDto,
  ) {}

  // response Wish
  // swagger: id: number
  @Delete(":id")
  deleteWishById(@Param("id") id: string) {}

  // response пустой объект
  // swagger: id: number
  @Post(":id/copy")
  copyWithById(@Param("id") id: string) {}
}
