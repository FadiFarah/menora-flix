const mongoose = require("mongoose");

const newMovieSchema = new mongoose.Schema(
    {
        imdbID: {
            type: String,
            required: true,
            unique: true
        },
        type: {
            type: String,
            required: true
        },
        year: {
            type: Number,
            required: true
        },
        title: {
            type: String,
            required: true
        },
        poster: {
            type: String,
            required: true
        }
    },
    {
        collection: 'newMovies'
    }
);

const model = mongoose.model("newMovieSchema", newMovieSchema);

module.exports = model;