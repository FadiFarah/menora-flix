const mongoose = require("mongoose");

const recommendedMovieSchema = new mongoose.Schema(
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
            type: String,
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
        collection: 'recommendedMovies'
    }
);

const model = mongoose.model("recommendedMovieSchema", recommendedMovieSchema);

module.exports = model;