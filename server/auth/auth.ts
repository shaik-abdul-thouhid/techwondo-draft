import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';
import { config } from 'dotenv';
import * as users from './users.json';
config();

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
export const authenticateLogin = (req: Request, res: Response) => {
    const
        username = req.query.username as string,
        password = req.query.password as string;
    
    if (username !== undefined && password !== undefined) {
        if (username in Users && Users[username]['password'] === password) {
            res.status(201).json({ accessToken: jwt.sign({ username: username }, process.env.SECRET_KEY!) });
        }
        else
            res.status(403).send('username or password is incorrect');
    }
    else res.status(403).send('Username or password is empty');
}

/**
 * Authenticates a session or user token and proceeds with further operations
 * if the token is found valid else returns an Error.
 */
export const authenticateToken = (req: Request, res: Response, next: NextFunction) => {

    const tokenHeader = req.headers['authorization'];
    const token = tokenHeader && tokenHeader.split(' ')[1];
    if (token === undefined) {
        res.sendStatus(401);
    }
    else
        jwt.verify(token, process.env.SECRET_KEY!, (err, username) => {
            if (err) res.sendStatus(403);
            req.body = { username: username, ...req.body };
            next();
        });
}