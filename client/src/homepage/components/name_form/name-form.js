import {sanitize} from '../../../utility/security';
import {
  charLetterValidator,
  pasteLetterValidator
} from './components/validation_input/validators/validators';

export class NameForm {
  constructor() {
    this.labelText;

    this.name;
    this.nameValidators = {
      id: 'name',
      onInput: charLetterValidator,
      onPaste: pasteLetterValidator
    };
  }

  activate(params) {
    this.labelText = params.labelText;
  }

  submit() {
    try {
      const cleanInput = sanitize(document.getElementById(this.nameValidators.id).value, 'name', 0, 32);
      document.getElementById('output').innerHTML = `${cleanInput} is awesome!`;
    } catch (err) {
      console.log(err);
      document.getElementById('output').innerHTML = err.message;
    }
  }
}