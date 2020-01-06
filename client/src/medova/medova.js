import {inject} from 'aurelia-framework';
import {Router} from 'aurelia-router';
import {LoginApi} from '../api/login';

@inject(LoginApi, Router)
export class Medova {
  constructor(api, router) {
    this.api = api;
    this.router = router;
  }

  async attached() {
    try {
      const result = await this.api.verifyToken();

      if (!result) {
        this.router.navigateToRoute('login');
      }
    } catch (err) {
      return errorHandler({err: err, context: 'attached', isLast: true});
    }
  }
}
