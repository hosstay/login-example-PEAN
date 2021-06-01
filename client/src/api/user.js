import {inject, Aurelia} from 'aurelia-framework';
import {Router} from 'aurelia-router';
import {DataLoader} from '../utility/data-loader';
import {timeoutPromise} from '../utility/utility';

@inject(Router, Aurelia, DataLoader)
export class UserApi {
  constructor(router, aurelia, dataLoader) {
    this.router = router;
    this.aurelia = aurelia;
    this.dataLoader = dataLoader;
  }

  async logIn(user, pass) {
    const response = await this.dataLoader.httpFetch({
      prefix: 'api/user/',
      endpoint: 'login',
      payload: {
        username: user,
        password: pass
      }
    });

    if (response.success) {
      document.getElementById('error-text').innerHTML = 'You have successfully logged in.';

      await timeoutPromise(2000);

      document.getElementsByTagName('BODY')[0].style.backgroundImage = 'none';
      this.router.navigate('', {replace: true, trigger: false});
      return this.aurelia.setRoot(PLATFORM.moduleName('homepage/main'));
    } else {
      document.getElementById('error-text').innerHTML = response.msg;
    }
  }

  async addUser(user, pass) {
    const response = await this.dataLoader.httpFetch({
      prefix: 'api/user/',
      endpoint: 'create',
      payload: {
        username: user,
        password: pass
      }
    });

    if (response.success) {
      document.getElementById('error-text').innerHTML =
        'You have successfully registered. ' +
        'This page will navigate back to the login screen in 3 seconds.';

      await timeoutPromise(2000);

      return this.router.navigateToRoute('login');
    } else {
      document.getElementById('error-text').innerHTML = response.msg;
    }
  }

  async logout() {
    const response = await this.dataLoader.httpFetch({
      prefix: 'api/user/',
      endpoint: 'logout'
    });

    return response;
  }
}