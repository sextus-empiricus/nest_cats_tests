import {
   Body,
   Controller,
   Post,
} from '@nestjs/common';
import { CatsService } from '../services/cats.service';
import { CreateCatDto } from '../dto/create-cat.dto';

@Controller('cats')
export class CatsController {
   constructor(private readonly catsService: CatsService) {}

   @Post()
   async create(@Body() createCatDto: CreateCatDto) {
      return await this.catsService.create(createCatDto);
   }

   // @Get()
   // findAll() {
   //   return this.catsService.findAll();
   // }
   //
   // @Get(':id')
   // findOne(@Param('id') id: string) {
   //   return this.catsService.findOne(+id);
   // }
   //
   // @Patch(':id')
   // update(@Param('id') id: string, @Body() updateCatDto: UpdateCatDto) {
   //   return this.catsService.update(+id, updateCatDto);
   // }
   //
   // @Delete(':id')
   // remove(@Param('id') id: string) {
   //   return this.catsService.remove(+id);
   // }
}
