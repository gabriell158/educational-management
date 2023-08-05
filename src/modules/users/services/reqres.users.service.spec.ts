import { Test, TestingModule } from '@nestjs/testing';
import { faker } from '@faker-js/faker';
import { NotFoundException } from '@nestjs/common';
import { ReqResUsersService } from './reqres.users.service';
import { ReqResUsersRepository } from '../repositories/reqres.users.repository';
import 'dotenv/config';
import { AxiosService } from '../../axios/axios.service';

describe('UsersService', () => {
  let service: ReqResUsersService;
  let repository: ReqResUsersRepository;
  let savedUser;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ReqResUsersService,
        ReqResUsersRepository,
        {
          provide: AxiosService,
          useFactory: () => null,
        },
      ],
    }).compile();

    service = module.get<ReqResUsersService>(ReqResUsersService);
    repository = module.get<ReqResUsersRepository>(ReqResUsersRepository);
    savedUser = {
      id: faker.number.int(),
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      avatar: faker.internet.avatar(),
      email: faker.internet.email(),
    };
  });

  it('should find a user', async () => {
    jest.spyOn(repository, 'findOne').mockImplementation(async () => savedUser);
    const user = await service.findOne(savedUser.id);
    expect(user).toMatchObject(savedUser);
  });

  it('should throw an error if a user is not found', async () => {
    try {
      jest.spyOn(repository, 'findOne').mockImplementation(() => null);
      await service.findOne(faker.number.int());
    } catch (error) {
      expect(error).toBeInstanceOf(NotFoundException);
    }
  });

  it('should return a list of users', async () => {
    jest.spyOn(repository, 'find').mockImplementation(async () => [savedUser]);
    const users = await service.findAll();
    expect(users).toBeInstanceOf(Array);
    expect(users).toHaveLength(1);
    expect(users[0]).toMatchObject(savedUser);
  });
});
