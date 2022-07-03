"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.db = void 0;
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
require("module-alias/register");
const app_1 = require("firebase-admin/app");
const firestore_1 = require("firebase-admin/firestore");
const app = (0, express_1.default)();
//routes
const auth_1 = __importDefault(require("./routes/auth"));
const users_1 = __importDefault(require("./routes/users"));
dotenv_1.default.config();
//settings
app.set('port', process.env.PORT || 80);
// middlewares
app.use(express_1.default.json());
(0, app_1.initializeApp)({
    credential: (0, app_1.applicationDefault)()
});
exports.db = (0, firestore_1.getFirestore)();
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method");
    res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, PATCH,  DELETE");
    res.header("Allow", "GET, POST, OPTIONS, PATCH, DELETE");
    app.use((0, cors_1.default)());
    next();
});
//routes
app.use('/api', auth_1.default);
app.use('/api', users_1.default);
exports.default = app;
