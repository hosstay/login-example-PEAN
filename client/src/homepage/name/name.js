import {HomepageRoute} from '../components/homepage_route/homepage-route';

export class Name extends HomepageRoute {
  constructor(...rest) {
    super(...rest);

    this.nameFormObj = {
      labelText: 'Enter Name:'
    };
  }
}