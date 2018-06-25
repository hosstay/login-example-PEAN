//input: the string to sanitize
//id: the id of the input element the string came from
//er_id: the id of the element to output the error to
//length: the allowable length of the string
module.exports.sanitize = function(input, id, err_id, minLength, maxLength){
  if(input === ""){
    document.getElementById(err_id).innerHTML = id + " field empty";
    document.getElementById(id).focus();
    return false;
  } else{
    if(input.length < minLength || input.length > maxLength){
      document.getElementById(err_id).innerHTML = id + " field must be between " + minLength + " and " + maxLength + " characters.";
      document.getElementById(id).focus();
      return false;
    } else {
      // "/" define the area of the regex.
      // ^ says there can be no text before this symbol
      // $ says there can be no text after this symbol
      // thus the input must conform to exactly what is contained in this pattern
      // []+ means what is in the brackets can be repeated one or more times.
      // \w means any alphanumeric character and underscores.
      // there is a space after \w, thus allowing spaces.
      // thus this expression matches only alphanumeric characters and spaces
      const regex = /^[\w ]+$/;

      //if the input doesn't match the regular expression, alert the user.
      if(!regex.test(input)){
        document.getElementById(err_id).innerHTML = id + " field should only contain alphanumeric characters, underscores, and spaces.";
        document.getElementById(id).focus();
        return false;
      } else {
        //returns input with special characters encoded in the off chance someone gets through the previous checks.
        return encodeURIComponent(input);
      }
    }
  }
}
