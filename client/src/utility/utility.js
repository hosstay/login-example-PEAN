/**
 * Collects error information as the error propogates through functions
 * with the intention of giving a simple stack trace.
 *
 * @param {object} errObj - Obj containing the following information:
 *        {object} err - the error parameter from the catch block
 *        {string} context - name of the function that this call is coming from
 *        {boolean} isLast - whether or not this is the last function in the chain
 *        {boolean} reject - whether or not the error being thrown is coming from a promise rejection
 * @return {string or array} - returns a string or array of strings depending on if it's a promise rejection.
*/

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

  const err = errObj.err;
  const context = errObj.context;
  const isLast = errObj.isLast;
  const reject = errObj.reject;

  let errArr = [];

  if (typeof err === 'string') {
    errArr.push(err); // case where string is explicitly thrown
  } else if (err[0] !== undefined) {
    errArr = err; // case where it's the array we're passing foward
  } else {
    errArr.push(err); // case where a inexplicit error is thrown
  }

  errArr.push('=> ' + context);

  if (isLast) {
    let output = '';

    for (const i in errArr) {
      if (typeof errArr[i] === 'object') { // if item is err obj
        if (errArr[i].stack !== undefined) { // if err obj has .stack property (edge doesn't)
          output += errArr[i].stack + '\n';
        } else if (errArr[i].message !== undefined) { // if is err obj
          output += errArr[i].message + '\n';
        } else { // if is fetch response obj or other unidentified obj
          for (const j in errArr[i]) {
            output += j + ': ' + errArr[i][j] + '\n';
          }
        }
      } else { // if item is string
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

/**
 * Provides a console.log interface that only prints when debugging is true.
 *
 * @param {string} string - text to log
 */
function debugLog(string) {
  const DEBUG = false;

  if (DEBUG) {
    console.log(string);
  }
}

/**
 * Promise function that waits a designated amount of milliseconds
 *
 * @param {number} ms
 * @return {boolean} - true on resolution.
 */
function timeoutPromise(ms) {
  return new Promise((resolve, reject) => {
    try {
      setTimeout(() => {
        return resolve(true);
      }, ms);
    } catch (err) {
      console.log(err);
      reject(err);
    }
  });
}

export {
  errorHandler,
  debugLog,
  timeoutPromise
};