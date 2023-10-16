import { IsNumber, IsOptional, IsUrl } from "class-validator";

export class CreateWishlistDto {
  @IsOptional()
  name: string;

  @IsOptional()
  @IsUrl()
  image: string;

  @IsOptional()
  @IsNumber({}, { each: true })
  itemsId: number[];
}
