import { Controller, Get, Param } from '@nestjs/common';
import { ReqResUsersService } from '../services/reqres.users.service';

@Controller('users')
export class ReqResUsersController {
  constructor(private readonly reqResUsersService: ReqResUsersService) {}

  @Get()
  findAll() {
    return this.reqResUsersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.reqResUsersService.findOne(+id);
  }
}
