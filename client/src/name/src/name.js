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
      const result = await this.api.verifyToken();

      if (!result) {
        this.router.navigateToRoute('login');
      }
    } catch (err) {
      return errorHandler({err: err, context: 'attached', isLast: true});
    }
  }

  submit() {
    try {
      const cleanInput = sanitize(this.name, "name", 0, 32);
      document.getElementById('output').innerHTML = `${cleanInput} is awesome!`;
    } catch(err) {
      if (typeof err === 'string'){
        document.getElementById('output').innerHTML = err;
      } else {
        return errorHandler({err: err, context: 'submit', isLast: true});
      }
    }
  }
}
