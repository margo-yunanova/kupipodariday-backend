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

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async createUser(createUserDto: CreateUserDto) {
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

  async findProfile(username: string): Promise<CreateUserDto> {
    const user = await this.userRepository
      .createQueryBuilder("user")
      .where({ username })
      .addSelect(["user.email", "user.password"])
      .getOne();
    return user;
  }

  async findById(id: number) {
    const user = await this.userRepository.findOneBy({ id });
    return user;
  }

  async updateUser(id: number, updateUserDto: UpdateUserDto) {
    if (Object.hasOwn(updateUserDto, "password")) {
      updateUserDto.password = await bcrypt.hash(
        updateUserDto.password,
        saltOrRounds,
      );
    }
    const user = await this.userRepository.update(id, updateUserDto);
    return user;
  }

  async findMany(query: string) {
    const users: UserProfileResponseDto[] = await this.userRepository.findBy([
      { username: Like(`%${query}%`) },
      { email: Like(`%${query}%`) },
    ]);

    return users;
  }

  async findByUsername(username: string) {
    const user: UserPublicProfileResponseDto =
      await this.userRepository.findOneBy({ username });
    console.log(user);
    return user;
  }

  getOwnWishes(authorization: string) {
    return `This action return user withes`;
  }

  getUserWishes(authorization: string) {
    return `This action return user withes`;
  }
}
