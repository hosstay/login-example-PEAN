import {inject, Aurelia, PLATFORM} from 'aurelia-framework';
import {HttpClient} from 'aurelia-fetch-client';
import {AppState} from './appState';

@inject(Aurelia, HttpClient, AppState)
export class App {
  constructor(aurelia, HttpClient, appState) {
    this.aurelia = aurelia;
    this.httpClient = HttpClient;
    this.appState = appState;

    // Used for navigating back to the correct route after refresh
    this.appState.urlRoute = document.location.hash;

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

  async configureRouter(config, router) {
    config.map([
      {route: ['', 'login'], name: 'login', moduleId: PLATFORM.moduleName('./authentication/login/login'), title: 'Login'},
      {route: 'register', name: 'register', moduleId: PLATFORM.moduleName('./authentication/register/register'), title: 'Register'}
    ]);

    config.fallbackRoute('login');

    this.router = router;
  }
}