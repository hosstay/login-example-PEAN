import {inject} from 'aurelia-framework';
import {Router} from 'aurelia-router';
import {HttpClient} from 'aurelia-fetch-client';
import {DataLoader} from '../utility/data-loader';

@inject(Router, HttpClient, DataLoader)
export class SecurityApi {
  constructor(router, httpClient, dataLoader) {
    this.router = router;
    this.httpClient = httpClient;
    this.dataLoader = dataLoader;
  }

  async verifyToken() {
    const response = await this.dataLoader.httpFetch({
      httpClient: this.httpClient,
      prefix: 'api/security/',
      endpoint: 'verifyToken'
    });

    return response;
  }
}