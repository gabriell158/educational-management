import { PrismaService } from '../../prisma/prisma.service';
import { Test, TestingModule } from '@nestjs/testing';
import { User } from '@prisma/client';
import { UsersRepository } from '../repositories/users.repository';
import { UsersService } from './users.service';
import { faker } from '@faker-js/faker';
import { NotFoundException } from '@nestjs/common';

describe('UsersService', () => {
  let service: UsersService;
  let repository: UsersRepository;
  let savedUser: User;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        UsersRepository,
        { provide: PrismaService, useFactory: () => ({}) },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    repository = module.get<UsersRepository>(UsersRepository);
    savedUser = {
      id: faker.number.int(),
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
    } as User;
  });

  it('should create a new user', async () => {
    jest.spyOn(repository, 'create').mockImplementation(async () => savedUser);
    const user = await service.create(savedUser);
    expect(user.firstName).toBe(savedUser.firstName);
    expect(user.lastName).toBe(savedUser.lastName);
  });

  it('should list all users', async () => {
    const savedUsers = [
      {
        id: faker.number.int(),
        firstName: faker.person.firstName(),
        lastName: faker.person.lastName(),
      },
      {
        id: faker.number.int(),
        firstName: faker.person.firstName(),
        lastName: faker.person.lastName(),
      },
      {
        id: faker.number.int(),
        firstName: faker.person.firstName(),
        lastName: faker.person.lastName(),
      },
    ] as User[];
    jest.spyOn(repository, 'find').mockImplementation(async () => savedUsers);
    const users = await service.findAll();
    expect(users).toBeInstanceOf(Array);
    expect(users).toHaveLength(savedUsers.length);
    users.map((user, index) => {
      expect(user.firstName).toBe(savedUsers[index].firstName);
      expect(user.lastName).toBe(savedUsers[index].lastName);
    });
  });

  it('should return the user with the given id', async () => {
    jest.spyOn(repository, 'findOne').mockImplementation(async () => savedUser);
    const user = await service.findOne(savedUser.id);
    expect(user.id).toBe(savedUser.id);
    expect(user.firstName).toBe(savedUser.firstName);
    expect(user.lastName).toBe(savedUser.lastName);
  });

  it('should throw an error if no user is found', async () => {
    jest.spyOn(repository, 'findOne').mockImplementation(async () => null);
    try {
      await service.findOne(faker.number.int());
    } catch (error) {
      expect(error).toBeInstanceOf(NotFoundException);
      expect(error.message).toBe('User not found');
    }
  });

  it('should throw an error if no user is found', async () => {
    jest.spyOn(repository, 'findOne').mockImplementation(async () => null);
    try {
      await service.update(faker.number.int(), {});
    } catch (error) {
      expect(error).toBeInstanceOf(NotFoundException);
      expect(error.message).toBe('User not found');
    }
  });

  it('should throw an error if no user is found', async () => {
    jest.spyOn(repository, 'findOne').mockImplementation(async () => null);
    try {
      await service.remove(faker.number.int());
    } catch (error) {
      expect(error).toBeInstanceOf(NotFoundException);
      expect(error.message).toBe('User not found');
    }
  });

  it('should update a saved user', async () => {
    const updatedData = {
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
    };
    jest
      .spyOn(repository, 'findOne')
      .mockImplementationOnce(async () => savedUser)
      .mockImplementationOnce(
        async () =>
          ({
            id: savedUser.id,
            firstName: updatedData.firstName,
            lastName: updatedData.lastName,
          } as User),
      );
    jest.spyOn(repository, 'update').mockImplementationOnce(() => null);
    const user = await service.update(savedUser.id, updatedData);
    expect(user.id).toBe(savedUser.id);
    expect(user.firstName).toBe(updatedData.firstName);
    expect(user.lastName).toBe(updatedData.lastName);
  });

  it('should delete a saved user', async () => {
    jest
      .spyOn(repository, 'findOne')
      .mockImplementationOnce(async () => savedUser);
    jest
      .spyOn(repository, 'delete')
      .mockImplementationOnce(async () => savedUser);
    const deletedUser = await service.remove(savedUser.id);
    expect(deletedUser).toBe(savedUser);
  });
});
