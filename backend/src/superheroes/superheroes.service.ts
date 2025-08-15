import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateSuperheroDto } from './dto/create-superhero.dto';
import { UpdateSuperheroDto } from './dto/update-superhero.dto';

@Injectable()
export class SuperheroesService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateSuperheroDto) {
    const hero = await this.prisma.superhero.create({
      data: {
        nickname: dto.nickname,
        real_name: dto.real_name,
        origin_description: dto.origin_description,
        superpowers: dto.superpowers,
        catch_phrase: dto.catch_phrase,
        images: dto.imageIds?.length
          ? { connect: dto.imageIds.map((id) => ({ id })) }
          : undefined,
      },
      include: { images: true },
    });
    return hero;
  }

  async findAll(page = 1, limit = 5) {
    const [items, total] = await this.prisma.$transaction([
      this.prisma.superhero.findMany({
        skip: (page - 1) * limit,
        take: limit,
        orderBy: { createdAt: 'desc' },
        include: { images: { take: 1, orderBy: { createdAt: 'asc' } } },
      }),
      this.prisma.superhero.count(),
    ]);
    return {
      items,
      total,
      page,
      limit,
      pages: Math.ceil(total / limit),
    };
  }

  async findOne(id: string) {
    const hero = await this.prisma.superhero.findUnique({
      where: { id },
      include: { images: true },
    });
    if (!hero) throw new NotFoundException('Superhero not found');
    return hero;
  }

  async update(id: string, dto: UpdateSuperheroDto) {
    // Оновлення основних полів
    const hero = await this.prisma.superhero.update({
      where: { id },
      data: {
        nickname: dto.nickname,
        real_name: dto.real_name,
        origin_description: dto.origin_description,
        superpowers: dto.superpowers,
        catch_phrase: dto.catch_phrase,
      },
      include: { images: true },
    });

    // Якщо передано imageIds — переприв’язати
    if (dto.imageIds) {
      // спершу відв’язати всі
      await this.prisma.image.updateMany({
        where: { superheroId: id },
        data: { superheroId: null },
      });
      // потім прив’язати нові
      await this.prisma.image.updateMany({
        where: { id: { in: dto.imageIds } },
        data: { superheroId: id },
      });
    }

    return this.findOne(id);
  }

  async remove(id: string) {
    return this.prisma.superhero.delete({ where: { id } });
  }
}
