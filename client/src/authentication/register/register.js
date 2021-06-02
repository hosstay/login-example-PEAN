import {AuthenticationRoute} from '../components/authentication_route/authentication-route';
import {sanitizeLogin} from '../../utility/security';
import {errorHandler} from '../../utility/utility';

export class Register extends AuthenticationRoute {
  constructor(...rest) {
    super(...rest);

    this.user = '';
    this.pass = '';
    this.conf_pass = '';
  }

  async submit() {
    try {
      let cleanUsername = '';
      let cleanPassword = '';

      try {
        cleanUsername = sanitizeLogin(this.user, 'username', 6, 32);
        cleanPassword = sanitizeLogin(this.pass, 'password', 8, 18);
      } catch (err) {
        document.getElementById('error-text').innerHTML = err.message;
      }

      if (cleanUsername !== '' && cleanPassword !== '') {
        if (this.pass === this.conf_pass) {
          await this.userApi.addUser(cleanUsername, cleanPassword);
        } else {
          document.getElementById('error-text').innerHTML = 'Password and Confirm Password did not match.';
        }
      }
    } catch (err) {
      document.getElementById('error-text').innerHTML = 'Something went wrong';
      return errorHandler({err: err, context: 'submit', isLast: true});
    }
  }

  login() {
    this.router.navigateToRoute('login');
  }
}