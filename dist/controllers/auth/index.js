"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logout = exports.login = exports.registerUser = void 0;
const jsonwebtoken_1 = require("jsonwebtoken");
const bcrypt_1 = require("bcrypt");
const app_1 = require("../../app");
const error_1 = require("../../helpers/error");
const earn_turns_1 = require("../../cron-jobs/earn-turns");
const registerUser = async (req, res) => {
    const { email, name, password } = req.body;
    if (name === '') {
        return res.status(400).json({
            success: false,
            message: error_1.errorsInputs.name
        });
    }
    else if (email === '') {
        return res.status(400).json({
            success: false,
            message: error_1.errorsInputs.name
        });
    }
    else if (password === '') {
        return res.status(400).json({
            success: false,
            message: error_1.errorsInputs.password
        });
    }
    else {
        const salt = (0, bcrypt_1.genSaltSync)(10);
        try {
            const existUser = await app_1.db.collection('users').where('email', '==', email).get();
            if (existUser.docs.length === 0) {
                const objUser = {
                    name,
                    email,
                    turns: 5,
                };
                const jsontoken = (0, jsonwebtoken_1.sign)({ result: objUser }, `${process.env.SECRET}`, {
                    expiresIn: "1h",
                });
                const { id } = await app_1.db.collection('users').add({
                    name,
                    email,
                    password: (0, bcrypt_1.hashSync)(password, salt),
                    turns: 5
                });
                return res.json({
                    success: true,
                    data: {
                        id,
                        name,
                        email,
                        turns: 5
                    },
                    token: jsontoken
                });
            }
            else {
                return res.status(400).json({
                    success: false,
                    error: error_1.errorsUnauthorized.unauthorized
                });
            }
        }
        catch (error) {
            console.log(error);
            return res.status(500).json({
                success: false,
                message: error_1.errorsServer.server
            });
        }
    }
};
exports.registerUser = registerUser;
const login = async (req, res) => {
    const { email, password } = req.body;
    if (email === "") {
        return res.status(400).json({
            success: false,
            message: error_1.errorsInputs.email
        });
    }
    else {
        if (password === "") {
            return res.status(400).json({
                success: false,
                message: error_1.errorsInputs.password
            });
        }
    }
    const user = await app_1.db.collection('users').where('email', '==', email).get();
    try {
        if (user.docs.length !== 0) {
            const parseUser = user.docs[0].data();
            const documentID = user.docs[0].id;
            const result = (0, bcrypt_1.compareSync)(password, parseUser.password);
            if (result) {
                parseUser.password = '';
                parseUser.id = documentID;
                const jsontoken = (0, jsonwebtoken_1.sign)({ result: parseUser }, `${process.env.SECRET}`, {
                    expiresIn: "1h",
                });
                (0, earn_turns_1.earnTurns)(parseUser, true);
                return res.json({
                    success: true,
                    data: {
                        id: parseUser.id,
                        name: parseUser.name,
                        email: parseUser.email,
                        turns: parseUser.turns
                    },
                    token: jsontoken,
                });
            }
            else {
                return res.status(400).json({
                    success: false,
                    message: error_1.errorsInputs.credentials
                });
            }
        }
        else {
            return res.status(400).json({
                success: false,
                message: error_1.errorsInputs.credentials
            });
        }
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: error_1.errorsServer.server
        });
    }
};
exports.login = login;
const logout = async (req, res) => {
    (0, earn_turns_1.earnTurns)({}, false);
    return res.json({
        success: true
    });
};
exports.logout = logout;
