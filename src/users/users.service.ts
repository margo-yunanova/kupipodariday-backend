import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { User } from "./entities/user.entity";
import { Repository } from "typeorm";
import { UserProfileDto } from "./dto/user-profile.dto";

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async createUser(createUserDto: CreateUserDto) {
    const userDTO = this.userRepository.create(createUserDto);
    const user = await this.userRepository.save(userDTO);
    return user;
  }

  async findByUsername(username: string) {
    const user = await this.userRepository.findOneBy({ username });
    return user;
  }

  async findOne(authorization: string) {
    //const token = authorization.slice(7);
    const user = await this.userRepository.findOneBy({
      id: 4,
    });
    return user;
    //{
    //   username: "margo",
    //   about: "ляляля",
    //   email: "test1@gmail.com",
    //   password: "q@R3kY#rv3ZLu@S",
    //   id: 4,
    //   avatar: "https://i.pravatar.cc/300",
    //   createdAt: "2023-10-16T13:54:03.613Z",
    //   updatedAt: "2023-10-16T13:54:03.613Z",
    // };
  }

  update(authorization: string, updateUserDto: UpdateUserDto) {
    return `This action updates a user`;
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
