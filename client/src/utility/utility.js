function errorHandler(errObj) {

  /*
    If this is the first time handled (err is string) then make it array
    for the rest of the journey.

    Each time err is handled the context of that catch block is added.

    If the err has reached it's final destination (third parameter is true)
    then send as concat string.

    if the err is from a promise (is needed for a reject) (fourth parameter)
    then just return the array of err so it can be rejected and will continue
    the journey outside.
  */

  let err = errObj.err;
  let context = errObj.context;
  let isLast = errObj.isLast;
  let reject = errObj.reject;

  let errArr = [];

  if (typeof err === 'string') {
    errArr.push(err); //case where string is explicitly thrown
  } else if (err[0] !== undefined) {
    errArr = err; //case where it's the array we're passing foward
  } else {
    errArr.push(err); //case where a inexplicit error is thrown
  }

  errArr.push('=> ' + context);

  if (isLast) {
    let output = '';

    for (let i in errArr) {
      if (typeof errArr[i] === 'object') { //if item is err obj
        if (errArr[i].stack !== undefined) { //if err obj has .stack property (edge doesn't)
          output += errArr[i].stack + '\n';
        } else if (errArr[i].message !== undefined) { //if is err obj
          output += errArr[i].message + '\n';
        } else { //if is fetch response obj or other unidentified obj
          for (let j in errArr[i]) {
            output += j + ': ' + errArr[i][j] + '\n';
          }
        }
      } else { //if item is string
        output += errArr[i] + '\n';
      }
    }

    console.log(output);
    return output;
  } else {
    if (!reject) {
      throw errArr;
    } else {
      return errArr;
    }
  }
}

function timeoutPromise(milli) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {   
      return resolve(true);
    }, milli);
  });
}

export {
  errorHandler,
  timeoutPromise
};
