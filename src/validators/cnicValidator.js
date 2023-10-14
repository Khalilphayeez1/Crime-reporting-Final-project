let cnicRegex = /^[0-9+]{5}-[0-9+]{7}-[0-9]{1}$/
export let cnicValidator = (cnic) => cnicRegex.test(cnic);
