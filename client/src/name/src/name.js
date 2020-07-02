import {inject} from 'aurelia-framework';
import {Router} from 'aurelia-router';
import {LoginApi} from '../../api/login';
import {sanitize} from '../../utility/security';

@inject(LoginApi, Router)
export class Name {
  constructor(api, router) {
    this.api = api;
    this.router = router;
    this.name;
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

  submit() {
    try {
      const cleanInput = sanitize(this.name, 'name', 0, 32);
      document.getElementById('output').innerHTML = `${cleanInput} is awesome!`;
    } catch (err) {
      console.log(err);
      document.getElementById('output').innerHTML = err.message;
    }
  }
}