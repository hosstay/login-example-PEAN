import {sanitize} from '../../../utility/security';

export class NameForm {
  constructor() {
    this.name;
    this.labelText;
  }

  activate(params) {
    this.labelText = params.labelText;
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