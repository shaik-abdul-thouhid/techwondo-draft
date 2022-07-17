"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const showsSchema = new mongoose_1.Schema({
    username: String,
    shows: [{
            title: String,
            streamingApp: String,
            rating: String,
            review: String
        }]
});
(0, mongoose_1.model)("Shows", showsSchema);
(0, mongoose_1.connect)('mongodb://localhost/techwondo', (e) => console.log('connected'));
