import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ImagesService {
  constructor(private prisma: PrismaService) {}

  create(filename: string, url: string) {
    return this.prisma.image.create({ data: { filename, url } });
  }

  assignToSuperhero(imageIds: string[], superheroId: string) {
    return this.prisma.image.updateMany({
      where: { id: { in: imageIds } },
      data: { superheroId },
    });
  }

  remove(id: string) {
    return this.prisma.image.delete({ where: { id } });
  }
}
