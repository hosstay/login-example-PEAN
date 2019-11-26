import {inject} from 'aurelia-framework';
import {Router} from 'aurelia-router';
import {WebAPI} from '../web-api';
const sanitize = require('../sanitize');

@inject(WebAPI, Router)
export class Name {
  constructor(api, router) {
    this.api = api;
    this.router = router;
  }

  async attached(){
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
    const cleanInput = sanitize.sanitize(this.name, "name", "output", 0, 32);
    if (cleanInput){
      document.getElementById('output').innerHTML = `${cleanInput} is awesome!`;
    }
  }
}
