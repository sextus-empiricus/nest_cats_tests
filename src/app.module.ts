import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CatsModule } from './cats/cats.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { config } from '../config/config';

const { host, port, username, password, database } = config.typeOrm;

@Module({
   imports: [
      TypeOrmModule.forRoot({
         type: 'mysql',
         host,
         port,
         username,
         password,
         database,
         entities: ['./dist/**/*.entity{.ts,.js}'],
         logging: true,
         synchronize: true,
      }),
      CatsModule,
   ],
   controllers: [AppController],
   providers: [AppService],
})
export class AppModule {}
