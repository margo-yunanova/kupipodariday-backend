import { ConflictException, Injectable } from "@nestjs/common";
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
    const isUserExist = await this.userRepository.findBy([
      { username: createUserDto.username },
      { email: createUserDto.email },
    ]);

    if (isUserExist.length > 0)
      throw new ConflictException(
        "Пользователь с таким email или username уже зарегистрирован",
      );

    const hashPassword = await bcrypt.hash(
      createUserDto.password,
      saltOrRounds,
    );

    const userDTO = {
      ...createUserDto,
      password: hashPassword,
    };

    const user = await this.userRepository.save(userDTO);
    return user;
  }

  async findOwnProfile(username: string): Promise<CreateUserDto> {
    const user: CreateUserDto = await this.userRepository
      .createQueryBuilder("user")
      .where({ username })
      .addSelect(["user.email", "user.password"])
      .getOne();
    return user;
  }

  async findById(userId: number) {
    const user: UserProfileResponseDto = await this.userRepository.findOneBy({
      id: userId,
    });
    return user;
  }

  async updateOwnProfile(userId: number, updateUserDto: UpdateUserDto) {
    const users = await this.userRepository.findBy([
      { username: updateUserDto.username },
      { email: updateUserDto.email },
    ]);

    for (const user of users) {
      if (user.id !== userId)
        throw new ConflictException(
          "Пользователь с таким логином или email уже зарегистрирован",
        );
    }

    if (Object.hasOwn(updateUserDto, "password")) {
      updateUserDto.password = await bcrypt.hash(
        updateUserDto.password,
        saltOrRounds,
      );
    }

    await this.userRepository.update(userId, updateUserDto);
    const user: UserProfileResponseDto = await this.userRepository
      .createQueryBuilder("user")
      .where({ id: userId })
      .addSelect("user.email")
      .getOne();

    return user;
  }

  async getOwnWishes(userId: number) {
    const wishes: Wish[] = await this.wishRepository.findBy({
      owner: { id: userId },
    });
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
    const wishes: Wish[] = await this.wishRepository.findBy({
      owner: { id: user.id },
    });
    return wishes;
  }
}
