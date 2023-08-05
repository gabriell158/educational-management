import { Inject, Injectable } from '@nestjs/common';
import { AxiosService } from '../../axios/axios.service';

export interface User {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  avatar: string;
}

export interface FindRequestBody<T> {
  data: T;
}

export interface FindManyRequestBody<T> {
  page: number;
  per_page: number;
  total: number;
  total_pages: number;
  data: T[];
}

@Injectable()
export class ReqResUsersRepository {
  constructor(
    @Inject(AxiosService) private readonly axiosService: AxiosService,
  ) {}

  async find() {
    const { data } = await this.axiosService.get<FindManyRequestBody<User>>(
      '/users?per_page=12',
    );
    return data.map(({ first_name, last_name, ...props }) => ({
      ...props,
      firstName: first_name,
      lastName: last_name,
    }));
  }

  async findOne(id: number) {
    const {
      data: { first_name, last_name, ...data },
    } = await this.axiosService.get<FindRequestBody<User>>(`/users/${id}`);
    return { ...data, firstName: first_name, lastName: last_name };
  }
}
