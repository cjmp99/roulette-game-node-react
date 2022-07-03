"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.earnTurns = void 0;
const node_cron_1 = __importDefault(require("node-cron"));
const app_1 = require("../../app");
const earnTurns = (parseUser, active) => {
    const incrementClaim = node_cron_1.default.schedule('* * * * *', async () => {
        var _a;
        const existUser = await app_1.db.collection('users').doc(parseUser === null || parseUser === void 0 ? void 0 : parseUser.id).get();
        if (existUser.data()) {
            const objUser = {
                id: parseUser === null || parseUser === void 0 ? void 0 : parseUser.id,
                name: parseUser === null || parseUser === void 0 ? void 0 : parseUser.name,
                email: parseUser === null || parseUser === void 0 ? void 0 : parseUser.email,
                turns: ((_a = existUser.data()) === null || _a === void 0 ? void 0 : _a.turns) + 1
            };
            await app_1.db.collection('users').doc(parseUser === null || parseUser === void 0 ? void 0 : parseUser.id).update(objUser);
        }
    });
    if (active) {
        incrementClaim.start();
        console.log('start increment');
    }
    else {
        incrementClaim.stop();
        console.log('stop increment');
    }
};
exports.earnTurns = earnTurns;
