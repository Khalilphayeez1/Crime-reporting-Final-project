let usernameRegex = /^[a-zA-Z0-9_]{3,20}$/
export let usernameValidator = (username) => usernameRegex.test(username);

/*
a
Username consists of alphanumeric characters (a-zA-Z0-9), lowercase, or uppercase.
Username allowed of the dot (.), underscore (_), and hyphen (-).
The dot (.), underscore (_), or hyphen (-) must not be the first or last character.
The dot (.), underscore (_), or hyphen (-) does not appear consecutively, e.g., java..regex
The number of characters must be between 5 to 20.

*/