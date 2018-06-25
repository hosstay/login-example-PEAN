import {inject} from 'aurelia-framework';
import {Router} from 'aurelia-router';
import {WebAPI} from '../web-api';

@inject(WebAPI, Router)
export class Home {
  constructor(api, router){
    this.api = api;
    this.router = router;

    //call the promise verification function and do the rest after it resolves.
    this.api.verifyToken().then(function(result){
      if(result){
        //stay here
      } else {
        router.navigateToRoute('login');
      }
    }).catch(function(err){
      console.log("Error in promise." + err);
    });
  }
}
