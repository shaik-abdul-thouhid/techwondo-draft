"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticateToken = exports.authenticateLogin = void 0;
const jwt = __importStar(require("jsonwebtoken"));
const dotenv_1 = require("dotenv");
const users = __importStar(require("./users.json"));
(0, dotenv_1.config)();
/**
 * JSON containing finite number of users credentials
 */
const Users = JSON.parse(JSON.stringify(users));
/**
 * Creates a session token without any expiration date with it.
 * If all the credentials provided are deemed to be correct, then the function
 * returns a username object encrypted with jwt.
 * else returns an error with status code 403
 */
const authenticateLogin = (req, res) => {
    const username = req.query.username, password = req.query.password;
    if (username !== undefined && password !== undefined) {
        if (username in Users && Users[username]['password'] === password) {
            res.status(201).json({ accessToken: jwt.sign({ username: username }, process.env.SECRET_KEY) });
        }
        else
            res.status(403).send('username or password is incorrect');
    }
    else
        res.status(403).send('Username or password is empty');
};
exports.authenticateLogin = authenticateLogin;
/**
 * Authenticates a session or user token and proceeds with further operations
 * if the token is found valid else returns an Error.
 */
const authenticateToken = (req, res, next) => {
    const tokenHeader = req.headers['authorization'];
    const token = tokenHeader && tokenHeader.split(' ')[1];
    if (token === undefined) {
        res.sendStatus(401);
    }
    else
        jwt.verify(token, process.env.SECRET_KEY, (err, username) => {
            if (err)
                res.sendStatus(403);
            req.body = Object.assign({ username: username }, req.body);
            next();
        });
};
exports.authenticateToken = authenticateToken;
