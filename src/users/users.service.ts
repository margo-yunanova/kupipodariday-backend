import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Like, Repository } from "typeorm";
import * as bcrypt from "bcrypt";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { User } from "./entities/user.entity";
import { saltOrRounds } from "src/constants/constants";
import { UserProfileResponseDto } from "./dto/user-profile-response.dto";
import { UserPublicProfileResponseDto } from "./dto/user-public-profile-response.dto";
import { Wish } from "src/wishes/entities/wish.entity";

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(Wish) private wishRepository: Repository<Wish>,
  ) {}

  async registerUser(createUserDto: CreateUserDto) {
    const hashPassword = await bcrypt.hash(
      createUserDto.password,
      saltOrRounds,
    );
    const userDTO = this.userRepository.create({
      ...createUserDto,
      password: hashPassword,
    });
    const user = await this.userRepository.save(userDTO);
    return user;
  }

  async findOwnProfile(username: string) {
    const user: CreateUserDto = await this.userRepository
      .createQueryBuilder("user")
      .where({ username })
      .addSelect(["user.email", "user.password"])
      .getOne();
    return user;
  }

  async findById(id: number) {
    const user: UserProfileResponseDto = await this.userRepository.findOneBy({
      id,
    });
    return user;
  }

  async updateOwnProfile(id: number, updateUserDto: UpdateUserDto) {
    if (Object.hasOwn(updateUserDto, "password")) {
      updateUserDto.password = await bcrypt.hash(
        updateUserDto.password,
        saltOrRounds,
      );
    }

    await this.userRepository.update(id, updateUserDto);
    const user: UserProfileResponseDto = await this.userRepository
      .createQueryBuilder("user")
      .where({ id })
      .addSelect("user.email")
      .getOne();

    return user;
  }

  async getOwnWishes(id: number) {
    const wishes: Wish[] = await this.wishRepository.findBy({ owner: id });
    return wishes;
  }

  async findMany(query: string) {
    const users: UserPublicProfileResponseDto[] =
      await this.userRepository.findBy([
        { username: Like(`%${query}%`) },
        { email: Like(`%${query}%`) },
      ]);

    return users;
  }

  async getUser(username: string) {
    const user: UserPublicProfileResponseDto =
      await this.userRepository.findOneBy({ username });
    return user;
  }

  async getUserWishes(username: string) {
    const user: UserPublicProfileResponseDto =
      await this.userRepository.findOneBy({ username });
    const wishes: Wish[] = await this.wishRepository.findBy({ owner: user.id });
    return wishes;
  }
}
