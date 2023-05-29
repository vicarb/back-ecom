import { IsString, IsNumber, IsArray } from 'class-validator';

export class CreateProductDto {
  @IsString()
  readonly title: string;

  @IsString()
  readonly description: string;

  @IsNumber()
  readonly price: number;

  @IsString()
  readonly mainImage: string;

  @IsArray()
  @IsString({ each: true })
  readonly extraImages: string[];
}
