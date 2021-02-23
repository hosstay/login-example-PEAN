import {inject} from 'aurelia-framework';
import {Router} from 'aurelia-router';
import {SecurityApi} from '../../api/security';
import {sanitize} from '../../utility/security';

@inject(SecurityApi, Router)
export class Name {
  constructor(api, router) {
    this.api = api;
    this.router = router;
    this.name;
  }

  async attached() {
    this.api.verifyTokenOrLogin();
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