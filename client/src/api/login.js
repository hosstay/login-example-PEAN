import {inject} from 'aurelia-framework';
import {Router} from 'aurelia-router';
import {HttpClient} from 'aurelia-fetch-client';
import {DataLoader} from '../utility/data-loader';
import {timeoutPromise} from '../utility/utility';

@inject(Router, HttpClient, DataLoader)
export class LoginApi {
  constructor(router, httpClient, dataLoader) {
    this.router = router;
    this.httpClient = httpClient;
    this.dataLoader = dataLoader;

    const baseUrl = location.protocol + '//' + window.location.hostname + ':3000/';
    this.httpClient.configure((config) => {
      config
          .useStandardConfiguration()
          .withBaseUrl(baseUrl)
          .withDefaults({
            credentials: 'include',
            mode: 'cors'
          });
    });
  }

  async logIn(user, pass) {
    const response = await this.dataLoader.httpFetch({
      httpClient: this.httpClient,
      prefix: 'api/user/',
      endpoint: 'login',
      payload: {
        username: user,
        password: pass
      }
    });

    if (response.success) {
      document.getElementById('error-text').innerHTML = 'You have successfully logged in.';

      await timeoutPromise(2000);

      document.getElementsByTagName('BODY')[0].style.backgroundImage = 'none';
      return this.router.navigateToRoute('home');
    } else {
      document.getElementById('error-text').innerHTML = response.msg;
    }
  }

  async addUser(user, pass) {
    const response = await this.dataLoader.httpFetch({
      httpClient: this.httpClient,
      prefix: 'api/user/',
      endpoint: 'create',
      payload: {
        username: user,
        password: pass
      }
    });

    if (response.success) {
      document.getElementById('error-text').innerHTML =
        'You have successfully registered. ' +
        'This page will navigate back to the login screen in 3 seconds.';

      await timeoutPromise(2000);

      return this.router.navigateToRoute('login');
    } else {
      document.getElementById('error-text').innerHTML = response.msg;
    }
  }

  async verifyToken() {
    const response = await this.dataLoader.httpFetch({
      httpClient: this.httpClient,
      prefix: 'api/secure/',
      endpoint: 'verify'
    });

    return response;
  }

  async logout() {
    const response = await this.dataLoader.httpFetch({
      httpClient: this.httpClient,
      prefix: 'api/user/',
      endpoint: 'logout'
    });

    return response;
  }
}