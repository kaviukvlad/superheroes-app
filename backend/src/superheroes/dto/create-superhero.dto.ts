import { IsArray, IsOptional, IsString } from 'class-validator';

export class CreateSuperheroDto {
  @IsString() nickname: string;
  @IsString() real_name: string;
  @IsString() origin_description: string;
  @IsString() superpowers: string; // можна передавати "flight,heat vision"
  @IsString() catch_phrase: string;

  @IsOptional()
  @IsArray()
  imageIds?: string[]; // масив id зображень, завантажених раніше
}
