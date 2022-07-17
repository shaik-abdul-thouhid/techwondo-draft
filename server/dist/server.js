"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// imports
const express_1 = __importDefault(require("express"));
const auth_1 = require("./auth/auth");
const db_1 = require("./database/db");
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = require("dotenv");
const app = (0, express_1.default)();
// Express Configurations
(0, dotenv_1.config)();
app.use(express_1.default.json());
app.use(body_parser_1.default.json());
app.use((0, cors_1.default)());
// Server Routes
app.get('/login', auth_1.authenticateLogin);
app.get('/shows', auth_1.authenticateToken, db_1.returnTVShowsList);
app.post('/shows/add', auth_1.authenticateToken, db_1.addShow);
app.post('/shows/update/:title', auth_1.authenticateToken, db_1.updateShow);
app.listen(process.env.PORT, () => {
    console.log('server running at port', process.env.PORT);
});
