import {inject, PLATFORM} from 'aurelia-framework';
import {Redirect} from 'aurelia-router';
import {SecurityApi} from '../api/security';

export class Homepage {
  constructor() {

  }

  configureRouter(config, router) {
    config.addAuthorizeStep(AuthorizeStep);
    config.map([
      {route: ['/', '', 'home'], name: 'home', moduleId: PLATFORM.moduleName('./home/home'), title: 'Home', settings: {auth: true}},
      {route: 'name', name: 'name', moduleId: PLATFORM.moduleName('./name/name'), title: 'Name', settings: {auth: true}},
      {route: 'surf', name: 'surf', moduleId: PLATFORM.moduleName('./surf/surf'), title: 'Surf', settings: {auth: true}},
      {route: 'logout', name: 'logout', moduleId: PLATFORM.moduleName('./logout/logout'), title: 'Logout'}
    ]);

    config.fallbackRoute('home');

    this.router = router;
  }
}

@inject(SecurityApi)
class AuthorizeStep {
  constructor(securityApi) {
    this.securityApi = securityApi;
  }

  run(navigationInstruction, next) {
    if (navigationInstruction.getAllInstructions().some((i) => i.config.settings.auth)) {
      const isLoggedIn = this.securityApi.verifyToken();
      if (!isLoggedIn) {
        return next.cancel(new Redirect('login'));
      }
    }

    return next();
  }
}