import { Request, Response, NextFunction } from 'express';
/**
 * Creates a session token without any expiration date with it.
 * If all the credentials provided are deemed to be correct, then the function
 * returns a username object encrypted with jwt.
 * else returns an error with status code 403
 */
export declare const authenticateLogin: (req: Request, res: Response) => void;
/**
 * Authenticates a session or user token and proceeds with further operations
 * if the token is found valid else returns an Error.
 */
export declare const authenticateToken: (req: Request, res: Response, next: NextFunction) => void;
