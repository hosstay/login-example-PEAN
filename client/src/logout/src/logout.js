import {inject} from 'aurelia-framework';
import {Router} from 'aurelia-router';
import {LoginApi} from '../../api/login';

@inject(LoginApi, Router)
export class Logout {
  constructor(api, router) {
    this.api = api;
    this.router = router;
  }

  async attached() {
    try {
      const hasToken = await this.api.verifyToken();

      if (!hasToken) {
        this.router.navigateToRoute('login');
        return;
      }

      const result = await this.api.logout();

      if (result) {
        document.getElementsByTagName('BODY')[0].style.backgroundImage = 'url(https://i.imgur.com/bh2ywHi.jpg)';
        this.router.navigateToRoute('home');
      } else {
        throw new Error('Something went wrong while logging out.');
      }
    } catch (err) {
      console.log(err);
    }
  }
}