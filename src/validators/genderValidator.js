let allowedGenders = ['male', 'female', 'not willing'];
export let genderValidator = (gender) => allowedGenders.includes(String(gender).toLowerCase());