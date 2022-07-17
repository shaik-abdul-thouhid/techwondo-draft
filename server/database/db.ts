import { Request, Response } from 'express';
import { readFile, writeFile } from 'fs';

let db: {
    [key: string]: {
        title: string;
        streamingApp: string,
        rating: string;
        review: string
    }[]
};

readFile('./db.json', 'utf8', (err, data) => {
    if (err) console.log(err);
    db = JSON.parse(data);
});

const updateFile = (data: {
    [key: string]: {
        title: string;
        streamingApp: string,
        rating: string;
        review: string
    }[]
}) => {
    writeFile('./db.json', JSON.stringify(data), { flag: 'w' }, (err) => console.log(err));
}

// Returns list of TV shows of the user
export const returnTVShowsList = (req: Request, res: Response) => {
    if (db[req.body.username['username']] !== undefined)
        res.json(db[req.body.username['username']]);
    else res.json([]);
}

// Adds a new Show to the list
export const addShow = (req: Request, res: Response) => {
    const prop = req.body['show'];

    if (prop !== undefined) {

        if (req.body.username['username'] in db) {
            db[req.body.username['username']].push({
                title: prop['title'],
                streamingApp: prop['streamingApp'],
                rating: prop['rating'],
                review: prop['review']
            });
            updateFile(db);
            res.json(db[req.body.username['username']]);
            console.log(db);
        }

        else {
            db[req.body.username['username']] = [];
            db[req.body.username['username']].push({
                title: prop['title'],
                streamingApp: prop['streamingApp'],
                rating: prop['rating'],
                review: prop['review']
            });
            updateFile(db);
            res.json(db[req.body.username['username']]);
            console.log(db);
        }

    }
}

// Deletes an existing TV show
// export const deleteShow = (req: Request, res: Response) => {
//     const prop = req.body['title'];
//     if (prop !== undefined) {
//         for (let i = 0; i < db[req.body.username['username']].length; i++) {
            
//         }
//     }
// }

// Updates an existing TV show
export const updateShow = (req: Request, res: Response) => {
    let params = req.body['shows'];

    if (params !== undefined) {
        
    }
}