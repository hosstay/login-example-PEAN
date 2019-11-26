import {inject} from 'aurelia-framework';
import {Router} from 'aurelia-router';
import {WebAPI} from '../web-api';

@inject(WebAPI, Router)
export class Logout {
  constructor(api, router){
    this.api = api;
    this.router = router;

    //call the promise logout function and do the rest after it resolves.
    this.api.logOut().then(function(result){
      if(result){
        //stay here
        document.getElementsByTagName("BODY")[0].style.backgroundImage = "url(https://i.imgur.com/bh2ywHi.jpg)";
        router.navigateToRoute('home');
      } else {
      }
    }).catch(function(err){
      console.log("Error in promise." + err);
    });


  }
}
