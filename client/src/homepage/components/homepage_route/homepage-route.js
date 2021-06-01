import {inject} from 'aurelia-framework';
import {AppState} from '../../../appState';

@inject(AppState)
export class HomepageRoute {
  constructor(appState) {
    this.appState = appState;

    if (this.appState.urlRoute !== '') {
      document.location.hash = this.appState.urlRoute;
      this.appState.urlRoute = '';
    }
  }
}