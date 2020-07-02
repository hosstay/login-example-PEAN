import {inject} from 'aurelia-framework';
import {Router} from 'aurelia-router';
import {LoginApi} from '../../api/login';

@inject(LoginApi, Router)
export class Home {
  constructor(api, router) {
    this.api = api;
    this.router = router;
  }

  async attached() {
    try {
      const hasToken = await this.api.verifyToken();

      if (!hasToken) {
        this.router.navigateToRoute('login');
      }
    } catch (err) {
      console.log(err);
    }
  }
}