import {inject} from 'aurelia-framework';
import {Router} from 'aurelia-router';
import {WebAPI} from '../web-api';
const sanitize = require('../sanitize');

@inject(WebAPI, Router)
export class Name {
  constructor(api, router){
    this.name = "";
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

  submit() {
    /* sanitize input */
    const cleanInput = sanitize.sanitize(this.name, "name", "output", 0, 32);
    if (cleanInput){
      document.getElementById('output').innerHTML = `${cleanInput} is awesome!`;
    }
  }
}
