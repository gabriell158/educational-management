import { Module } from '@nestjs/common';
import { UsersService } from './services/users.service';
import { UsersController } from './controllers/users.controller';
import { UsersRepository } from './repositories/users.repository';
import { AxiosService } from '../axios/axios.service';
import { PrismaService } from '../prisma/prisma.service';
import axios, { Axios } from 'axios';

@Module({
  controllers: [UsersController],
  providers: [
    UsersService,
    UsersRepository,
    PrismaService,
    AxiosService,
    {
      provide: Axios,
      useValue: axios.create({ baseURL: process.env.REQ_RES_API_URL }),
    },
  ],
})
export class UsersModule {}
