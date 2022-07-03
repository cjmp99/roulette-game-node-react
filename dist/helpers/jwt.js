"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkSession = void 0;
const jsonwebtoken_1 = require("jsonwebtoken");
const error_1 = require("./error");
const checkSession = (req, res, next) => {
    let token = req.get("authorization");
    if (token) {
        token = token.slice(7);
        (0, jsonwebtoken_1.verify)(token, `${process.env.SECRET}`, (error, decoded) => {
            if (error) {
                res.status(401).json({
                    success: false,
                    message: error_1.errorsUnauthorized.token
                });
            }
            else {
                next();
            }
        });
    }
    else {
        res.status(401).json({
            success: false,
            message: error_1.errorsUnauthorized.signin
        });
    }
};
exports.checkSession = checkSession;
