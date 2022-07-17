// imports
import express, { Express } from 'express';
import { authenticateLogin, authenticateToken } from './auth/auth';
import { returnTVShowsList, addShow, updateShow } from './database/db'
import bodyParser from 'body-parser';
import cors from 'cors';
import { config } from 'dotenv';

const app: Express = express();

// Express Configurations
config();
app.use(express.json());
app.use(bodyParser.json());
app.use(cors());

// Server Routes

app.get('/login', authenticateLogin);

app.get('/shows', authenticateToken, returnTVShowsList);

app.post('/shows/update', authenticateToken, updateShow);

app.listen(process.env.PORT, () => {
    console.log('server running at port ', process.env.PORT);
});
