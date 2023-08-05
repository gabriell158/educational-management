import {
  HttpException,
  Inject,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import axios, { Axios, AxiosError } from 'axios';

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
  client: Axios;
  constructor(@Inject(String) url: string) {
    this.client = axios.create({
      baseURL: url,
    });
  }

  async find() {
    try {
      const {
        data: { data },
      } = await this.client.get<FindManyRequestBody<User>>(
        '/users?per_page=12',
      );
      return data.map(({ first_name, last_name, ...props }) => ({
        ...props,
        firstName: first_name,
        lastName: last_name,
      }));
    } catch (error) {
      if (error instanceof AxiosError)
        throw new HttpException(
          error.response.statusText,
          error.response.status,
        );
      throw new InternalServerErrorException();
    }
  }

  async findOne(id: number) {
    try {
      const {
        data: {
          data: { first_name, last_name, ...data },
        },
      } = await this.client.get<FindRequestBody<User>>(`/users/${id}`);
      return { ...data, firstName: first_name, lastName: last_name };
    } catch (error) {
      if (error instanceof AxiosError)
        throw new HttpException(
          error.response.statusText,
          error.response.status,
        );
      throw new InternalServerErrorException();
    }
  }
}
