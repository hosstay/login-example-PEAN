import {inject, Aurelia, PLATFORM} from 'aurelia-framework';
import {AppState} from './appState';

@inject(Aurelia, AppState)
export class App {
  constructor(aurelia, appState) {
    this.aurelia = aurelia;
    this.appState = appState;

    // Used for navigating back to the correct route after refresh
    this.appState.urlRoute = document.location.hash;
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