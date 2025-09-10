
export const validUser = { username: 'standard_user', password: 'secret_sauce' };

export const invalidLogins = [
  { username: 'invalid_user', password: 'secret_sauce', message: 'Epic sadface' },
  { username: 'standard_user', password: 'wrong_password', message: 'Epic sadface' },
  { username: 'locked_out_user', password: 'secret_sauce', message: 'Epic sadface: Sorry, this user has been locked out.' },
];

export const customers = [
  {firstName: 'Test', lastName:'Test', pincode:'41190'},
];