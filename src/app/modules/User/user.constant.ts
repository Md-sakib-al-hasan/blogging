//email validitons
export const emailValidationRegex =
  /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
//usr role type
export const roletype = ['admin', 'user'];

//hidden files
export const userHiddenfelds = [
  'isBlocked',
  'role',
  '__v',
  'updatedAt',
  'createdAt',
  'password',
];
//user role for authentications and authoriztions
export const USER_ROLE = {
  admin: 'admin',
  user: 'user',
} as const;
