import { OmitType } from "@nestjs/swagger";
import { Wish } from "./wish.entity";

export class WishPartial extends OmitType(Wish, ["offers", "owner"]) {}
