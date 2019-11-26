import {inject} from 'aurelia-framework';
import {Router} from 'aurelia-router';
import {WebAPI} from '../web-api';
const sanitize = require('../sanitize');

@inject(WebAPI, Router)
export class Register {
  constructor(api, router){
    this.user = "";
    this.pass = "";
    this.conf_pass = "";
    this.registration = false;
    this.api = api;
    this.router = router;

    //Allows the user to hit enter to submit the form
    this.handleEnter = () => {
      event.preventDefault();
      if (event.keyCode === 13) {
        document.getElementById("submit-button").click();
      }
    };

    //Informs the user when capslock is on.
    this.handleCapsLock = e => {
      e = e || window.event;
      var s = String.fromCharCode( e.keyCode || e.which );

      if ( s.toUpperCase() === s && s.toLowerCase() !== s && !e.shiftKey){
        document.getElementById("error-text").innerHTML = "Caps Lock is on.";
      }else{
        document.getElementById("error-text").innerHTML = "";
      }
    };

    document.getElementsByTagName("BODY")[0].style.backgroundImage = "url(https://i.imgur.com/bh2ywHi.jpg)";
  }

  attached(){
    document.addEventListener("keyup", this.handleEnter);
    document.addEventListener("keypress", this.handleCapsLock);
    document.getElementById("username").focus();
  }

  detached(){
    document.removeEventListener("keyup", this.handleEnter);
    document.removeEventListener("keypress", this.handleCapsLock);
  }

  submit() {
    /* sanitize input */
    const cleanUsername = sanitize.sanitize(this.user, "username", "error-text", 6, 32);
    if (cleanUsername){
      const cleanPassword = sanitize.sanitize(this.pass, "password", "error-text", 8, 18);
      if (cleanPassword){
        if( this.pass === this.conf_pass ){
          this.api.addUser(cleanUsername, cleanPassword);
        }else{
          document.getElementById('error-text').innerHTML = "Password and Confirm Password did not match.";
        }
      }
    }
  }

  login() {
    this.router.navigateToRoute('login');
  }
}
