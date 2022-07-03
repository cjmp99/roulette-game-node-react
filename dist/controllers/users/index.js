"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.claimRewards = exports.updateTurns = exports.getInfoUser = void 0;
const error_1 = require("../../helpers/error");
const app_1 = require("../../app");
const getInfoUser = async (req, res) => {
    const { id } = req.params;
    if (id === '') {
        return res.status(400).json({
            success: false,
            message: error_1.errorsInputs.id
        });
    }
    else {
        try {
            const existUser = await app_1.db.collection('users').doc(id).get();
            if (existUser.data()) {
                const parseUser = existUser.data();
                const objUser = {
                    id,
                    name: parseUser === null || parseUser === void 0 ? void 0 : parseUser.name,
                    email: parseUser === null || parseUser === void 0 ? void 0 : parseUser.email,
                    turns: parseUser === null || parseUser === void 0 ? void 0 : parseUser.turns,
                };
                return res.json({
                    success: true,
                    data: objUser
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
exports.getInfoUser = getInfoUser;
const updateTurns = async (req, res) => {
    const { id } = req.params;
    if (id === '') {
        return res.status(400).json({
            success: false,
            message: error_1.errorsInputs.id
        });
    }
    else {
        try {
            const existUser = await app_1.db.collection('users').doc(id).get();
            if (existUser.data()) {
                const parseUser = existUser.data();
                const objUser = {
                    id,
                    name: parseUser === null || parseUser === void 0 ? void 0 : parseUser.name,
                    email: parseUser === null || parseUser === void 0 ? void 0 : parseUser.email,
                    turns: (parseUser === null || parseUser === void 0 ? void 0 : parseUser.turns) - 1,
                };
                await app_1.db.collection('users').doc(id).update(objUser);
                return res.json({
                    success: true,
                    data: objUser
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
exports.updateTurns = updateTurns;
const claimRewards = async (req, res) => {
    const { id, qty } = req.params;
    if (id === '') {
        return res.status(400).json({
            success: false,
            message: error_1.errorsInputs.id
        });
    }
    else {
        try {
            const existUser = await app_1.db.collection('users').doc(id).get();
            if (existUser.data()) {
                const parseUser = existUser.data();
                const objUser = {
                    id,
                    name: parseUser === null || parseUser === void 0 ? void 0 : parseUser.name,
                    email: parseUser === null || parseUser === void 0 ? void 0 : parseUser.email,
                    turns: (parseUser === null || parseUser === void 0 ? void 0 : parseUser.turns) + parseInt(qty),
                };
                await app_1.db.collection('users').doc(id).update(objUser);
                return res.json({
                    success: true,
                    data: objUser
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
exports.claimRewards = claimRewards;
