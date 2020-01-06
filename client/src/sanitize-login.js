//input: the string to sanitize
//id: the id of the input element the string came from
//er_id: the id of the element to output the error to
//length: the allowable length of the string
module.exports.sanitize = function(input, id, err_id, minLength, maxLength) {
  if (!input) {
    document.getElementById(err_id).innerHTML = "Incorrect username or password.";
    document.getElementById(id).focus();
    return false;
  } else {
    if (input.length < minLength || input.length > maxLength) {
      document.getElementById(err_id).innerHTML = "Incorrect username or password.";
      document.getElementById(id).focus();
      return false;
    } else {
      let regex;
      let errorMessage;

      if (id === 'username') {
        regex = RegExp(/^[\w ]+$/);
        errorMessage = 'Username field should only contain alphanumeric characters, underscores, and spaces.';
      } else if (id === 'password') {
        regex = RegExp(/^(?=(?:\S*\d))(?=(?:\S*[A-Za-z]))(?=\S*[^A-Za-z0-9])\S{8,}/);
        errorMessage = 'Password should have a minimum of 8 characters, at least 1 Uppercase Letter, 1 Lowercase Letter, 1 Number, and 1 Special Character.';
      }

      if (!regex.test(input)) {
        document.getElementById(err_id).innerHTML = errorMessage;
        document.getElementById(id).focus();
        return false;
      } else {
        return encodeURIComponent(input);
      }
    }
  }
}
