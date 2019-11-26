import {inject, PLATFORM} from 'aurelia-framework';
import {WebAPI} from './web-api';

@inject(WebAPI)
export class App {
  constructor(api) {
    this.api = api;
  }

  configureRouter(config, router) {
    config.title = '';
    config.map([
      { route: ['', 'home'],  name: 'home',     moduleId: PLATFORM.moduleName('./home/home'),         title: 'Home'},
      { route: 'login',       name: 'login',    moduleId: PLATFORM.moduleName('./login/login'),       title: 'Login'},
      { route: 'name',        name: 'name',     moduleId: PLATFORM.moduleName('./name/name'),         title: 'Name'},
      { route: 'medova',      name: 'medova',   moduleId: PLATFORM.moduleName('./medova/medova'),     title: 'Medova'},
      { route: 'logout',      name: 'logout',   moduleId: PLATFORM.moduleName('./logout/logout'),     title: 'Logout'},
      { route: 'register',    name: 'register', moduleId: PLATFORM.moduleName('./register/register'), title: 'Register'}
    ]);

    this.router = router;
  }
}
