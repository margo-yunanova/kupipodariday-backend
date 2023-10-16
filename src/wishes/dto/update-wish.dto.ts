import { PartialType } from "@nestjs/swagger";
import { CreateWishDto } from "./create-wish.dto";

export class UpdateWishDto extends PartialType(CreateWishDto) {
  // TODO в сваггере нет свойств
}
