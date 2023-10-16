import { Module } from "@nestjs/common";
import { WishesService } from "./wishes.service";
import { WishesController } from "./wishes.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Wish } from "./entities/wish.entity";
import { WishPartial } from "./entities/wish-partial.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Wish, WishPartial])],
  controllers: [WishesController],
  providers: [WishesService],
})
export class WishesModule {}
