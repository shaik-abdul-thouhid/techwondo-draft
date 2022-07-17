import { connect, Schema, model } from 'mongoose';

const showsSchema = new Schema({
    username: String,
    shows: [{
        title: String,
        streamingApp: String,
        rating: String,
        review: String
    }]
});

model("Shows", showsSchema);

connect('mongodb://localhost/techwondo', (e) => console.log('connected'));

