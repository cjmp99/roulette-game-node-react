"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorsServer = exports.errorsUnauthorized = exports.errorsInputs = void 0;
exports.errorsInputs = {
    id: 'ID is required!',
    name: 'Name is required!',
    email: 'Email is required!',
    password: 'Password is required!',
    credentials: 'Email or password incorrect'
};
exports.errorsUnauthorized = {
    unauthorized: 'This user already exists!',
    token: 'Invalid token',
    signin: 'Please sign in to continue'
};
exports.errorsServer = {
    server: 'Something went wrong.'
};
