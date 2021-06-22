function charLetterValidator(event) {
  if (event.data !== null && !/^[a-zA-Z]$/.test(event.data)) {
    event.target.value = event.target.value.substring(0, event.target.value.length - 1);
  }
};

function pasteLetterValidator(event) {
  const paste = (event.clipboardData || window.clipboardData).getData('text');

  if (!/^[a-zA-Z]+$/.test(paste)) {
    event.returnValue = false;
  }
};

export {
  charLetterValidator,
  pasteLetterValidator
};