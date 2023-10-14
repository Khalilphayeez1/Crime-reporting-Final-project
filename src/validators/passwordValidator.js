let passwordRegEx = /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,20})/
export let passwordValidator = (password) => passwordRegEx.test(password);

/*
one upppercase
one lowercase
min lengthlength 8
max legnth 20
one special char
*/