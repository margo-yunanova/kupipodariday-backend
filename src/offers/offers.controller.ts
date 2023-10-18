import { Controller, Get, Post, Body, Param } from "@nestjs/common";
import { OffersService } from "./offers.service";
import { CreateOfferDto } from "./dto/create-offer.dto";

@Controller("offers")
export class OffersController {
  constructor(private readonly offersService: OffersService) {}

  // response видимо ничего {}
  @Post()
  createOffer(@Body() createOfferDto: CreateOfferDto) {
    return this.offersService.create(createOfferDto);
  }

  // response Offer[]
  @Get()
  getOffers() {
    return this.offersService.findAll();
  }

  //response Offer
  @Get(":id")
  getOfferById(@Param("id") id: string) {
    return this.offersService.findOne(+id);
  }
}
