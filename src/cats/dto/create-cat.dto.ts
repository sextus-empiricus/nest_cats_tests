import { CreateDtoInterface } from '../../types/cats/create.dto';
import { IsBoolean, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateCatDto implements CreateDtoInterface {
   @IsString()
   @IsNotEmpty()
   name: string;

   @IsString()
   @IsNotEmpty()
   color: string;

   @IsBoolean()
   @IsOptional()
   isPies?: boolean;
}
