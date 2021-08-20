import { Injectable, Logger } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { isObjectLike } from 'lodash';
import { map } from 'rxjs/operators';
import { to } from 'await-to-js';
import keysToCamelCase from 'camelcase-keys';
import { AxiosResponse, AxiosRequestConfig } from 'axios';

import { BadRequestException } from '../../errors';

export type RequestConfig = AxiosRequestConfig;
type ActionType = 'get' | 'post' | 'put' | 'patch' | 'delete';

@Injectable()
export class HttpClient {
  private logger: Logger = new Logger(HttpClient.name);

  constructor(private http: HttpService) {}

  async get<T>(uri: string, config?: RequestConfig): Promise<T> {
    return this.doRequest<T>(uri, 'get', null, config);
  }

  async post<T>(uri: string, data?: any, config?: RequestConfig): Promise<T> {
    return this.doRequest<T>(uri, 'post', data, config);
  }

  async put<T>(uri: string, data?: any, config?: RequestConfig): Promise<T> {
    return this.doRequest<T>(uri, 'put', data, config);
  }

  async patch<T>(uri: string, data?: any, config?: RequestConfig): Promise<T> {
    return this.doRequest<T>(uri, 'patch', data, config);
  }

  async delete<T>(uri: string, config?: RequestConfig): Promise<T> {
    return this.doRequest<T>(uri, 'delete', null, config);
  }

  private async doRequest<T>(
    uri: string,
    action: ActionType,
    data?: any,
    config?: RequestConfig,
  ): Promise<T> {
    const doIt = this.http[action];
    const args: any[] = [uri];
    if (data) {
      args.push(data);
    }
    if (config) {
      args.push(config);
    }

    const [error, result] = await to(
      doIt
        .apply(this.http, args)
        .pipe(map((res: AxiosResponse<any>) => res.data))
        .toPromise(),
    );

    if (error) {
      this.logger.error(error);
      throw new BadRequestException({ uri, result }, error);
    }

    return isObjectLike(result) ? (keysToCamelCase(result) as any as T) : (result as T);
  }
}
