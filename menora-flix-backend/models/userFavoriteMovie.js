const mongoose = require("mongoose");

const userFavoriteMovieSchema = new mongoose.Schema(
    {
        userId: {
            type: String,
            required: true,
            unique: true
        },
        favorites: {
            type: [
                {
                    imdbID: {
                        type: String,
                        required: false,
                    },
                    type: {
                        type: String,
                        required: false
                    },
                    year: {
                        type: String,
                        required: false
                    },
                    title: {
                        type: String,
                        required: false
                    },
                    poster: {
                        type: String,
                        required: false
                    }
                }
            ]
        }
    },
    {
        collection: 'userFavoriteMovies'
    }
);

const model = mongoose.model("userFavoriteMovieSchema", userFavoriteMovieSchema);

module.exports = model;