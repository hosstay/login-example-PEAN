/*
  Used like so:
 <validation-input params.bind="validationObj"></validation-input>

 Where the obj (in the constructor for the route you're using it in) looks like:
  this.validationObj = {
    id: 'validation_object',
    type: 'textArea'
    class: 'class1 class2',
    onInput: myValidator,
    onPaste: pasteMyValidator,
    onChange: changeMyValidator,
  };

  type parameter is optional, if it's set to 'textArea' it will be a textArea instead of an input.
*/

import {customElement, bindable} from 'aurelia-framework';

@customElement('validation-input')
export class ValidationInputCustomElement {
  @bindable params;

  constructor() {

  }

  attached() {
    const element = document.getElementById(this.params.id);

    if (this.params.onInput) {
      element.addEventListener('input', this.params.onInput);
    }

    if (this.params.onPaste) {
      element.addEventListener('paste', this.params.onPaste);
    }

    if (this.params.onChange) {
      element.addEventListener('change', this.params.onChange);
    }
  }
}