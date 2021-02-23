import {inject} from 'aurelia-framework';
import {Router} from 'aurelia-router';
import {SecurityApi} from '../../api/security';

@inject(SecurityApi, Router)
export class Medova {
  constructor(api, router) {
    this.api = api;
    this.router = router;
  }

  async attached() {
    this.api.verifyTokenOrLogin();
  }
}