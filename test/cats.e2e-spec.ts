import * as request from 'supertest';
import { CatsModule } from '../src/cats/cats.module';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { CatsService } from '../src/cats/services/cats.service';
import { ResponseStatus } from '../src/types/api/response';

describe('CatsController (e2e)', () => {
   let app: INestApplication;

   beforeEach(async () => {
      const moduleFixture: TestingModule = await Test.createTestingModule({
         imports: [CatsModule],
      })
         .overrideProvider(CatsService)
         .useValue({
            create: jest.fn().mockResolvedValue({
               status: ResponseStatus.success,
               createdCatId: 'test1234',
            }),
         })
         .compile();

      app = moduleFixture.createNestApplication();
      app.useGlobalPipes(
         new ValidationPipe({
            whitelist: true,
            forbidNonWhitelisted: true,
         }),
      );
      await app.init();
   });

   it('/cats (POST)', () => {
      return request(app.getHttpServer())
         .post('/cats')
         .send({
            name: 'Puszek',
            color: 'white',
         })
         .expect('Content-Type', /json/)
         .expect(201)
         .then((response) => {
            expect(response.body).toStrictEqual({
               status: ResponseStatus.success,
               createdCatId: expect.any(String),
            });
         });
   });

   it('/cats (POST) - incorrect DTO, 400 expected', () => {
      return request(app.getHttpServer())
         .post('/cats')
         .send({
            color: 'white',
         })
         .expect('Content-Type', /json/)
         .expect(400);
   });
});
