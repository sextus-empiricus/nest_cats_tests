import { Test, TestingModule } from '@nestjs/testing';
import { CatsService } from '../services/cats.service';
import { DataSource } from 'typeorm';
import { getDataSourceToken } from '@nestjs/typeorm';
import { Cat } from '../entities/cat.entity';
import { ResponseStatus } from '../../types/api/response';

describe('CatsService', () => {
   let service: CatsService;
   let dataSource: DataSource;

   beforeEach(async () => {
      const module: TestingModule = await Test.createTestingModule({
         providers: [
            CatsService,
            {
               provide: getDataSourceToken(),
               useValue: {
                  createQueryBuilder: jest.fn().mockReturnThis(),
                  insert: jest.fn().mockReturnThis(),
                  into: jest.fn().mockReturnThis(),
                  values: jest.fn().mockReturnThis(),
                  execute: jest.fn((dto) => ({
                     identifiers: [{ id: 'test1234' }],
                  })),
               },
            },
         ],
      }).compile();

      service = module.get<CatsService>(CatsService);
      dataSource = module.get<DataSource>(DataSource);
   });

   it('CatsService should be defined', () => {
      expect(service).toBeDefined();
   });
   it('DataSource should be defined', () => {
      expect(dataSource).toBeDefined();
   });

   describe('create', () => {
      const dto = {
         name: 'Puszek',
         color: 'white',
      };

      it('should insert into Cat table', async () => {
         const spy = jest.spyOn(
            dataSource.createQueryBuilder().insert(),
            'into',
         );
         await service.create(dto);
         expect(spy).toHaveBeenCalledWith(Cat);
      });

      it('should call dataSource with proper dto', async () => {
         const spy = jest.spyOn(
            dataSource.createQueryBuilder().insert(),
            'values',
         );
         await service.create(dto);
         expect(spy).toHaveBeenCalledWith(dto);
      });

      it('should return a proper response object', async () => {
         expect(await service.create(dto)).toStrictEqual({
            status: ResponseStatus.success,
            createdCatId: expect.any(String),
         });
      });

   });
});
