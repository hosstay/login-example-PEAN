import {inject, PLATFORM} from 'aurelia-framework';
import {WebAPI} from './web-api';
import {HttpClient} from 'aurelia-fetch-client';

@inject(WebAPI,HttpClient)
export class App {
  constructor(api,httpClient){
    this.api = api;

    httpClient.configure(config => {
      config
        .useStandardConfiguration();
    });

    this.httpClient = httpClient;
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
