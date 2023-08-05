import { Module } from '@nestjs/common';
import { UsersService } from './services/users.service';
import { UsersController } from './controllers/users.controller';
import { UsersRepository } from './repositories/users.repository';
import { AxiosService } from '../axios/axios.service';

@Module({
  controllers: [UsersController],
  providers: [UsersService, UsersRepository, AxiosService],
})
export class UsersModule {}
