import {inject} from 'aurelia-framework';
import {DataLoader} from '../utility/data-loader';

@inject(DataLoader)
export class SecurityApi {
  constructor(dataLoader) {
    this.dataLoader = dataLoader;
  }

  async verifyToken() {
    const response = await this.dataLoader.httpFetch({
      prefix: 'api/security/',
      endpoint: 'verifyToken'
    });

    return response;
  }
}