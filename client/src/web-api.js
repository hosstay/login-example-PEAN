import {inject} from 'aurelia-framework';
import {Router} from 'aurelia-router';
import {HttpClient} from 'aurelia-fetch-client';
import {DataLoader} from './utility/data-loader';
import {errorHandler, 
        timeoutPromise} from './utility/utility';

@inject(Router, HttpClient, DataLoader)
export class WebAPI {
  constructor(router, httpClient, dataLoader) {
    this.router = router;
    this.httpClient = httpClient;
    this.dataLoader = dataLoader;

    const baseUrl = location.protocol + '//' + window.location.hostname + ':3000/';
    this.httpClient.configure(config => {
      config
        .useStandardConfiguration()
        .withBaseUrl(baseUrl)
        .withDefaults({
          credentials: 'include',
          mode: 'cors'
        })
    });
  }

  async logIn(user, pass) {

    try {

      const END_POINT = 'login';

      const response = await this.dataLoader.httpFetch({
        httpClient: this.httpClient,
        prefix: 'api/user/',
        endpoint: END_POINT,
        payload: {
          username: user,
          password: pass
        },
        useCache: false
      });

      document.getElementById('error-text').innerHTML = 'You have successfully logged in.'
      
      await timeoutPromise(2000);

      document.getElementsByTagName('BODY')[0].style.backgroundImage = 'none';
      this.router.navigateToRoute('home');

      return response;
    } catch (err) {
      return errorHandler({err: err, context: 'addUser'});
    }
  }

  async addUser(user, pass) {

    try {

      const END_POINT = 'create';

      const response = await this.dataLoader.httpFetch({
        httpClient: this.httpClient,
        prefix: 'api/user/',
        endpoint: END_POINT,
        payload: {
          username: user,
          password: pass
        },
        useCache: false
      });

      document.getElementById('error-text').innerHTML = 
        'You have successfully registered. ' +
        'This page will navigate back to the login screen in 3 seconds.';
      
      await timeoutPromise(2000);

      this.router.navigateToRoute('login');

      return response;
    } catch (err) {
      return errorHandler({err: err, context: 'addUser'});
    }
  }

  async verifyToken() {

    try {

      const END_POINT = 'verify';

      const response = await this.dataLoader.httpFetch({
        httpClient: this.httpClient,
        prefix: 'api/secure/',
        endpoint: END_POINT,
        payload: {},
        useCache: false
      });

      return response;
    } catch (err) {
      return errorHandler({err: err, context: 'verifyToken'});
    }
  }

  async logout() {

    try {

      const END_POINT = 'logout';

      const response = await this.dataLoader.httpFetch({
        httpClient: this.httpClient,
        prefix: 'api/user/',
        endpoint: END_POINT,
        payload: {},
        useCache: false
      });

      return response;
    } catch (err) {
      return errorHandler({err: err, context: 'logOut'});
    }
  }
}
