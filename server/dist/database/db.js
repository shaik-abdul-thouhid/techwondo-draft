"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateShow = exports.addShow = exports.returnTVShowsList = void 0;
const fs_1 = require("fs");
let db;
(0, fs_1.readFile)('./db.json', 'utf8', (err, data) => {
    if (err)
        console.log(err);
    db = JSON.parse(data);
});
const updateFile = (data) => {
    (0, fs_1.writeFile)('./db.json', JSON.stringify(data), { flag: 'w' }, (err) => console.log(err));
};
// Returns list of TV shows of the user
const returnTVShowsList = (req, res) => {
    if (db[req.body.username['username']] !== undefined)
        res.json(db[req.body.username['username']]);
    else
        res.json([]);
};
exports.returnTVShowsList = returnTVShowsList;
// Adds a new Show to the list
const addShow = (req, res) => {
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
};
exports.addShow = addShow;
// Deletes an existing TV show
// export const deleteShow = (req: Request, res: Response) => {
//     const prop = req.body['title'];
//     if (prop !== undefined) {
//         for (let i = 0; i < db[req.body.username['username']].length; i++) {
//         }
//     }
// }
// Updates an existing TV show
const updateShow = (req, res) => {
};
exports.updateShow = updateShow;
