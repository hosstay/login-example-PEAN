import {inject} from 'aurelia-framework';
import {Router} from 'aurelia-router';
import {SecurityApi} from '../../api/security';
import {UserApi} from '../../api/user';

@inject(SecurityApi, UserApi, Router)
export class Logout {
  constructor(securityApi, userApi, router) {
    this.securityApi = securityApi;
    this.userApi = userApi;
    this.router = router;
  }

  async attached() {
    try {
      const hasToken = await this.securityApi.verifyToken();

      if (!hasToken) {
        this.router.navigateToRoute('login');
        return;
      }

      const result = await this.userApi.logout();

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