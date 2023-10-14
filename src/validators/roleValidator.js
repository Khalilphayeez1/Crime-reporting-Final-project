let allowedRoles = ['admin', 'citizen', 'police'];
export let roleValidator = (role) => allowedRoles.includes(String(role).toLowerCase());