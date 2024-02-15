import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsString,
} from 'class-validator';

export class CreateProductDto {
  @IsString()
  @IsNotEmpty({
    message: 'Name is Required',
  })
  @ApiProperty()
  name: string;

  @IsNumber()
  @ApiProperty()
  reviews: number;

  @IsNumber()
  @ApiProperty()
  stars: number;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  price: number;

  @IsNumber()
  @ApiProperty({
    minimum: 0,
    default: 0,
  })
  stock: number;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  image: string;

  @IsArray()
  @IsNotEmpty()
  @ApiProperty()
  colors: Array<string>;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  company: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  description: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  category: string;

  @IsBoolean()
  @IsNotEmpty()
  @ApiProperty()
  shipping: boolean;
}
