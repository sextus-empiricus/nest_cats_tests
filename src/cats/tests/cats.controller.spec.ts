import { Test, TestingModule } from '@nestjs/testing';
import { CatsController } from '../controllers/cats.controller';
import { CatsService } from '../services/cats.service';
import { ResponseStatus } from '../../types/api/response';
import { Cat } from '../entities/cat.entity';
import exp from 'constants';

describe('CatsController', () => {
   let controller: CatsController;
   let service: CatsService;

   beforeEach(async () => {
      const module: TestingModule = await Test.createTestingModule({
         controllers: [CatsController],
         providers: [
            {
               provide: CatsService,
               useValue: {
                  create: jest.fn((dto) => ({
                     status: ResponseStatus.success,
                     createdCatId: 'test1234',
                  })),
               },
            },
         ],
      }).compile();

      controller = module.get<CatsController>(CatsController);
      service = module.get<CatsService>(CatsService);
   });

   it('CatsController should be defined', () => {
      expect(controller).toBeDefined();
   });

   it('CatsService should be defined', () => {
      expect(controller).toBeDefined();
   });

   describe('create', () => {
      const correctDto = {
         name: 'puszek',
         color: 'white',
      };
      const incorrectDto = {
         color: 'white',
      };

      it('should return a proper response object', async () => {
         expect(await controller.create(correctDto)).toStrictEqual({
            status: ResponseStatus.success,
            createdCatId: expect.any(String),
         });
      });
      it('should pass to catsService a proper dto object', async () => {
         const spy = jest.spyOn(service, 'create')
         await controller.create(correctDto)
         expect(spy).toHaveBeenCalledWith(correctDto);
         spy.mockRestore();
      });
   });
});
