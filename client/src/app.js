import {PLATFORM} from 'aurelia-framework';

export class App {
  constructor() {
  }

  configureRouter(config, router) {
    config.title = '';
    config.map([
      {route: ['', 'home'], name: 'home', moduleId: PLATFORM.moduleName('./home/src/home'), title: 'Home'},
      {route: 'login', name: 'login', moduleId: PLATFORM.moduleName('./login/src/login'), title: 'Login'},
      {route: 'name', name: 'name', moduleId: PLATFORM.moduleName('./name/src/name'), title: 'Name'},
      {route: 'medova', name: 'medova', moduleId: PLATFORM.moduleName('./medova/src/medova'), title: 'Medova'},
      {route: 'logout', name: 'logout', moduleId: PLATFORM.moduleName('./logout/src/logout'), title: 'Logout'},
      {route: 'register', name: 'register', moduleId: PLATFORM.moduleName('./register/src/register'), title: 'Register'}
    ]);

    this.router = router;
  }
}