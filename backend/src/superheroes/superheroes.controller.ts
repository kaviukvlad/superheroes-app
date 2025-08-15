import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseFilters,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { SuperheroesService } from './superheroes.service';
import { CreateSuperheroDto } from './dto/create-superhero.dto';
import { UpdateSuperheroDto } from './dto/update-superhero.dto';
import { PaginationQueryDto } from '../common/dto/pagination-query.dto';
import { PrismaExceptionFilter } from '../common/filters/prisma-exception.filter';

@Controller('superheroes')
@UseFilters(new PrismaExceptionFilter())
@UsePipes(new ValidationPipe({ transform: true, whitelist: true }))
export class SuperheroesController {
  constructor(private service: SuperheroesService) {}

  @Post()
  create(@Body() dto: CreateSuperheroDto) {
    return this.service.create(dto);
  }

  @Get()
  findAll(@Query() { page, limit }: PaginationQueryDto) {
    return this.service.findAll(page, limit);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.service.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() dto: UpdateSuperheroDto) {
    return this.service.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.service.remove(id);
  }
}
