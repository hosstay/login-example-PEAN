import {PLATFORM} from 'aurelia-framework';

export class App {
  constructor() {
  }

  configureRouter(config, router) {
    config.title = '';
    config.map([
      {route: ['', 'home'], name: 'home', moduleId: PLATFORM.moduleName('./home/home'), title: 'Home'},
      {route: 'login', name: 'login', moduleId: PLATFORM.moduleName('./login/login'), title: 'Login'},
      {route: 'name', name: 'name', moduleId: PLATFORM.moduleName('./name/name'), title: 'Name'},
      {route: 'surf', name: 'surf', moduleId: PLATFORM.moduleName('./surf/surf'), title: 'Surf'},
      {route: 'logout', name: 'logout', moduleId: PLATFORM.moduleName('./logout/logout'), title: 'Logout'},
      {route: 'register', name: 'register', moduleId: PLATFORM.moduleName('./register/register'), title: 'Register'}
    ]);

    this.router = router;
  }
}