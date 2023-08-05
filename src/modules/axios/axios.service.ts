import {
  HttpException,
  Inject,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { Axios, AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';

@Injectable()
export class AxiosService {
  constructor(@Inject(Axios) private readonly client: Axios) {}

  async post<T = any, D = any>(
    url: string,
    data?: D,
    config?: AxiosRequestConfig<D>,
  ): Promise<T> {
    try {
      const { data: responseBody } = await this.client.post<
        T,
        AxiosResponse<T>,
        D
      >(url, data, config);
      return responseBody;
    } catch (error) {
      if (error instanceof AxiosError)
        throw new HttpException(
          error.response.statusText,
          error.response.status,
        );
      throw new InternalServerErrorException();
    }
  }

  async get<T = any, D = any>(
    url: string,
    config?: AxiosRequestConfig<D>,
  ): Promise<T> {
    try {
      const { data } = await this.client.get<T, AxiosResponse<T>, D>(
        url,
        config,
      );
      return data;
    } catch (error) {
      if (error instanceof AxiosError)
        throw new HttpException(
          error.response.statusText,
          error.response.status,
        );
      throw new InternalServerErrorException();
    }
  }

  async put<T = any, D = any>(
    url: string,
    data?: D,
    config?: AxiosRequestConfig<D>,
  ): Promise<T> {
    try {
      const { data: responseBody } = await this.client.put<
        T,
        AxiosResponse<T>,
        D
      >(url, data, config);
      return responseBody;
    } catch (error) {
      if (error instanceof AxiosError)
        throw new HttpException(
          error.response.statusText,
          error.response.status,
        );
      throw new InternalServerErrorException();
    }
  }

  async patch<T = any, D = any>(
    url: string,
    data?: D,
    config?: AxiosRequestConfig<D>,
  ): Promise<T> {
    try {
      const { data: responseBody } = await this.client.patch<
        T,
        AxiosResponse<T>,
        D
      >(url, data, config);
      return responseBody;
    } catch (error) {
      if (error instanceof AxiosError)
        throw new HttpException(
          error.response.statusText,
          error.response.status,
        );
      throw new InternalServerErrorException();
    }
  }

  async delete<T = any, D = any>(
    url: string,
    config?: AxiosRequestConfig<D>,
  ): Promise<T> {
    try {
      const { data: responseBody } = await this.client.delete<
        T,
        AxiosResponse<T>,
        D
      >(url, config);
      return responseBody;
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
