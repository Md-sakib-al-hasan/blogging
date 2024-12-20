"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.USER_ROLE = exports.roletype = exports.emailValidationRegex = void 0;
//email validitons
exports.emailValidationRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
//usr role type
exports.roletype = ['admin', 'user'];
//user role for authentications and authoriztions
exports.USER_ROLE = {
    admin: 'admin',
    user: 'user',
};
