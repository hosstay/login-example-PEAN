function timeoutPromise(milli) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      return resolve(true);
    }, milli);
  });
}

export {
  timeoutPromise
};