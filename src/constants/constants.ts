import { SetMetadata } from "@nestjs/common";

export const IS_PUBLIC_KEY = "isPublic";

export const Public = () => {
  return SetMetadata(IS_PUBLIC_KEY, true);
};

export const jwtConstants = {
  secret: "%NofKEIeROkj",
};

export const saltOrRounds = 10;
