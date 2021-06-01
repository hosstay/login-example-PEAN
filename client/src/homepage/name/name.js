import {HomepageRoute} from '../components/homepage_route/homepage-route';
import {sanitize} from '../../utility/security';

export class Name extends HomepageRoute {
  constructor(...rest) {
    super(...rest);

    this.name;
  }

  submit() {
    try {
      const cleanInput = sanitize(this.name, 'name', 0, 32);
      document.getElementById('output').innerHTML = `${cleanInput} is awesome!`;
    } catch (err) {
      console.log(err);
      document.getElementById('output').innerHTML = err.message;
    }
  }
}