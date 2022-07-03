"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_1 = require("../../controllers/auth");
const router = (0, express_1.Router)();
router.route('/users/create-account').post(auth_1.registerUser);
router.route('/users/login').post(auth_1.login);
router.route('/users/logout').post(auth_1.logout);
exports.default = router;
