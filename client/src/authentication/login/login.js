import {AuthenticationRoute} from '../components/authentication_route/authentication-route';
import {inject, Aurelia} from 'aurelia-framework';
import {SecurityApi} from '../../api/security';
import {sanitizeLogin} from '../../utility/security';

@inject(SecurityApi, Aurelia)
export class Login extends AuthenticationRoute {
  constructor(securityApi, aurelia, ...rest) {
    super(...rest);

    this.user = '';
    this.pass = '';
    this.securityApi = securityApi;
    this.aurelia = aurelia;
  }

  async afterAttached() {
    if (await this.securityApi.verifyToken()) {
      this.router.navigate('', {replace: true, trigger: false});
      return this.aurelia.setRoot(PLATFORM.moduleName('homepage/main'));
    }
  }

  async submit() {
    try {
      const cleanUsername = sanitizeLogin(this.user, 'username', 6, 32);
      const cleanPassword = sanitizeLogin(this.pass, 'password', 8, 18);

      await this.userApi.logIn(cleanUsername, cleanPassword);
    } catch (err) {
      console.log(err);
      document.getElementById('error-text').innerHTML = err.message;
    }
  }

  register() {
    this.router.navigateToRoute('register');
  }
}