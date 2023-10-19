import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import * as bcrypt from "bcrypt";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { User } from "./entities/user.entity";
import { saltOrRounds } from "src/constants/constants";

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

  async findByUsername(username: string) {
    const user = await this.userRepository.findOneBy({ username });
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

  getOwnWishes(authorization: string) {
    return `This action return user withes`;
  }

  getUserWishes(authorization: string) {
    return `This action return user withes`;
  }

  findUser(query: string) {
    return `This action removes a  user`;
  }
}
