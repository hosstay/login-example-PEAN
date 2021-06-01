import {inject, Aurelia} from 'aurelia-framework';
import {Router} from 'aurelia-router';
import {SecurityApi} from '../../api/security';
import {UserApi} from '../../api/user';

@inject(Aurelia, Router, SecurityApi, UserApi)
export class Logout {
  constructor(aurelia, router, securityApi, userApi) {
    this.aurelia = aurelia;
    this.router = router;
    this.securityApi = securityApi;
    this.userApi = userApi;
  }

  async attached() {
    try {
      const hasToken = await this.securityApi.verifyToken();

      if (!hasToken) {
        this.router.navigate('', {replace: true, trigger: false});
        return this.aurelia.setRoot(PLATFORM.moduleName('app'));
      }

      const result = await this.userApi.logout();

      if (result) {
        this.router.navigate('', {replace: true, trigger: false});
        return this.aurelia.setRoot(PLATFORM.moduleName('app'));
      } else {
        throw new Error('Something went wrong while logging out.');
      }
    } catch (err) {
      console.log(err);
    }
  }
}