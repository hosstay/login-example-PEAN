import {inject}       from 'aurelia-framework';
import {Router}       from 'aurelia-router';
import {WebAPI}       from '../web-api';
import {errorHandler} from '../utility/utility';

@inject(WebAPI, Router)
export class Home {
  constructor(api, router) {
    this.api = api;
    this.router = router;

    console.log('home constructor');
  }

  async attached(){
    console.log('home attached');

    try {

      console.log('before verifyToken');
      const result = await this.api.verifyToken();
      console.log('after verifyToken, result:');
      console.log(result);

      if (result) {
        console.log('stay');
        //stay here
      } else {
        console.log('go to login');
        router.navigateToRoute('login');
      }
    } catch (err) {
      console.log('error');
      return errorHandler({err: err, context: 'attached', isLast: true});
    }
  }
}
