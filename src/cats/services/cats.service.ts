import { Cat } from '../entities/cat.entity';
import { CreateCatDto } from '../dto/create-cat.dto';
import { CreateResponse } from '../../types/cats/cats.responses';
import { DataSource, InsertResult } from 'typeorm';
import { Inject, Injectable } from '@nestjs/common';
import { ResponseStatus } from '../../types/api/response';

@Injectable()
export class CatsService {
   constructor(@Inject(DataSource) private readonly dataSource: DataSource) {}

   async create(createCatDto: CreateCatDto): Promise<CreateResponse> {
      const insertResult: InsertResult = await this.dataSource
         .createQueryBuilder()
         .insert()
         .into(Cat)
         .values(createCatDto)
         .execute();
      return {
         status: ResponseStatus.success,
         createdCatId: insertResult.identifiers[0].id,
      };
   }

   // findAll() {
   //    return `This action returns all cats`;
   // }
   //
   // findOne(id: number) {
   //    return `This action returns a #${id} cat`;
   // }
   //
   // update(id: number, updateCatDto: UpdateCatDto) {
   //    return `This action updates a #${id} cat`;
   // }
   //
   // remove(id: number) {
   //    return `This action removes a #${id} cat`;
   // }
}
