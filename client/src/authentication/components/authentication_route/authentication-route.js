import {inject} from 'aurelia-framework';
import {Router} from 'aurelia-router';
import {UserApi} from '../../../api/user';

@inject(UserApi, Router)
export class AuthenticationRoute {
  constructor(userApi, router) {
    this.user = '';
    this.pass = '';
    this.userApi = userApi;
    this.router = router;
  }

  async attached() {
    document.addEventListener('keyup', this.handleEnter);
    document.addEventListener('keypress', this.handleCapsLock);
    document.getElementById('username').focus();

    await this.afterAttached();
  }

  async afterAttached() {
    // needs to be overridden if used.
  }

  detached() {
    document.removeEventListener('keyup', this.handleEnter);
    document.removeEventListener('keypress', this.handleCapsLock);
  }

  // Allows the user to hit enter to submit the form
  handleEnter() {
    if (event.keyCode === 13) {
      event.preventDefault();
      document.getElementById('submit-button').click();
    }
  }

  // Informs the user when capslock is on.
  handleCapsLock(event) {
    event = event || window.event;
    const char = String.fromCharCode(event.keyCode || event.which);

    if (char.toUpperCase() === char && char.toLowerCase() !== char && !event.shiftKey) {
      document.getElementById('error-text').innerHTML = 'Caps Lock is on.';
    } else {
      document.getElementById('error-text').innerHTML = '';
    }
  }
}