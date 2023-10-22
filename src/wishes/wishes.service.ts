import { Injectable } from "@nestjs/common";
import { CreateWishDto } from "./dto/create-wish.dto";
import { UpdateWishDto } from "./dto/update-wish.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Wish } from "./entities/wish.entity";

@Injectable()
export class WishesService {
  constructor(
    @InjectRepository(Wish) private wishRepository: Repository<Wish>,
  ) {}

  async createWish(createWishDto: CreateWishDto, id: number) {
    const wish = {
      ...createWishDto,
      owner: { id },
    };

    await this.wishRepository.save(wish);
  }

  async findLastWishes() {
    const wishes: Wish[] = await this.wishRepository.find({
      order: {
        createdAt: "desc",
      },
      take: 40,
    });

    return wishes;
  }

  async findTopWishes() {
    const wishes: Wish[] = await this.wishRepository.find({
      order: {
        copied: "desc",
      },
      take: 20,
    });

    return wishes;
  }

  async findWishById(wishId: number) {
    const wish: Wish = await this.wishRepository.findOne({
      where: { id: +wishId },
      relations: {
        owner: true,
        //offers: true,
      },
    });
    return wish;
  }

  /* TODO  Не забудьте про ограничения на редактирование и удаление «хотелок»:
  нельзя изменять или удалять чужие «хотелки», а также изменять стоимость,
  если уже есть желающие скинуться.*/

  async updateWishById(
    ownerId: number,
    wishId: number,
    updateWishDto: UpdateWishDto,
  ) {
    await this.wishRepository.update(
      { owner: { id: ownerId }, id: wishId },
      updateWishDto,
    );
  }

  async removeWishById(ownerId: number, wishId: number) {
    const removedWish = await this.wishRepository.findOne({
      where: { owner: { id: ownerId }, id: wishId },
    });

    await this.wishRepository.delete({
      owner: { id: ownerId },
      id: wishId,
    });
    return removedWish;
  }
}
