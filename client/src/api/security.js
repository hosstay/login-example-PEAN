import {inject} from 'aurelia-framework';
import {DataLoader} from '../utility/data-loader';
import {errorHandler} from '../utility/utility';

@inject(DataLoader)
export class SecurityApi {
  constructor(dataLoader) {
    this.dataLoader = dataLoader;
  }

  async verifyToken() {
    try {
      const response = await this.dataLoader.httpFetch({
        prefix: 'api/security/',
        endpoint: 'verifyToken'
      });

      return response;
    } catch (err) {
      return errorHandler({err: err, context: 'verifyToken'});
    }
  }
}