const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const cors = require("cors");
 
const mongoose = require("mongoose");
const User = require("../models/user");
const NewMovie = require("../models/newMovie");
const RecommendedMovie = require("../models/recommendedMovie");
const UserFavoriteMovie = require("../models/userFavoriteMovie");

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

require('dotenv').config();

const uri = `mongodb+srv://admin-fadi:${process.env.MONGO_PASSWORD}@cluster0.adpzx.mongodb.net/menoraflixdb?retryWrites=true&w=majority`;
mongoose.connect(uri, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => {
        console.log("Connected to mongo DB");
    })
    .catch((error) => {
        console.log(error);
    })

const app = express();
const port = process.env.PORT || 8000;
app.use(cors());
app.use(bodyParser.json());

app.post("/api/favorite", async (req, res) => {
    var token = req.headers.authorization;
    var favoriteMovies = req.body;
    try {
        var user = jwt.verify(token, process.env.JWT_SECRET);
        const _id = user.id;
        var userFavorite = await UserFavoriteMovie.findOne({userId: _id});
        if(userFavorite) {
            await UserFavoriteMovie.updateOne({userId: _id}, {
                $set: {favorites: favoriteMovies}
            })
        }
        else {
            await UserFavoriteMovie.create({
                userId: _id,
                favorites: favoriteMovies ? favoriteMovies : []
            })
        }
    }
    catch (error) {
        return res.json({status: 'error', error: error});
    }
    return res.json({status: "ok"});
});

app.get("/api/favorite", async (req, res) => {
    var token = req.headers.authorization;
    console.log(token);
    try {
        var user = jwt.verify(token, process.env.JWT_SECRET);
        const _id = user.id;

        var movies = await UserFavoriteMovie.findOne({userId: _id});
        if(!movies) {
            return res.json({status: "ok", data: []})
        }
        return res.json({status: "ok", data: movies.favorites})
    }
    catch (error) {
        return res.json({status: 'error', error: error});
    }
});

app.post("/api/recommended", async (req, res) => {
    var token = req.headers.authorization;
    var recommendedMovie = req.body;
    try {
        jwt.verify(token, process.env.JWT_SECRET);
        await RecommendedMovie.create({
            imdbID: recommendedMovie.imdbID,
            type: recommendedMovie.type,
	        year: recommendedMovie.year,
	        title: recommendedMovie.title,
	        poster: recommendedMovie.poster
        })
    }
    catch (error) {
        return res.json({status: 'error', error: error});
    }
    return res.json({status: "ok"});
});

app.get("/api/recommended", async (req, res) => {
    var token = req.headers.authorization;
    try {
        jwt.verify(token, process.env.JWT_SECRET);
        var movies = await RecommendedMovie.find();
        return res.json({status: "ok", data: movies})
    }
    catch (error) {
        return res.json({status: 'error', error: error});
    }
});

app.post("/api/new", async (req, res) => {
    var token = req.headers.authorization;
    var newMovie = req.body;
    try {
        jwt.verify(token, process.env.JWT_SECRET);
        await NewMovie.create({
            imdbID: newMovie.imdbID,
            type: newMovie.type,
	        year: newMovie.year,
	        title: newMovie.title,
	        poster: newMovie.poster
        })
    }
    catch (error) {
        return res.json({status: 'error', error: error});
    }
    return res.json({status: "ok"});
});

app.get("/api/new", async (req, res) => {
    var token = req.headers.authorization;
    try {
        jwt.verify(token, process.env.JWT_SECRET);
        var movies = await NewMovie.find();
        return res.json({status: "ok", data: movies})
    }
    catch (error) {
        return res.json({status: 'error', error: error});
    }
});

app.post("/api/authenticate-user", async (req, res) => {
    const { userName, password } = req.body;
    
    const user = await User.findOne({ userName }).lean();
    if(!user) {
        if(!userName || typeof userName !== 'string') {
            return res.json({status: 'error', error: 'Invalid username.'});
        }
        if(!password || typeof password !== 'string') {
            return res.json({status: 'error', error: 'Invalid password.'});
        }

        const userNameRegex = new RegExp('[a-zA-Z]{8,}', 'gm').test(userName);
        if(!userNameRegex) {
            return res.json({status: 'error', error: 'User name should be a atleast 8 characters with no numbers included.'});
        }

        const passwordRegex = new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{6,}$', 'gm').test(password);
        if(!passwordRegex) {
            return res.json({status: 'error', error: 'Password should be a minimum of six characters, at least one uppercase letter, one lowercase letter, one number and one special character.'});
        }
        
        const passwordHashed = await bcrypt.hash(password, 10);
        try {
            var newUser = await User.create({
                userName: userName,
                password: passwordHashed
            });

            const token = jwt.sign({id: newUser._id, userName: newUser.userName}, process.env.JWT_SECRET);
            return res.json({status: 'ok', data: token});
        }
        catch (error) {
            return res.json({status: 'error', error: error});
        }
    }
    else if(await bcrypt.compare(password, user.password)) {
        const token = jwt.sign({id: user._id, userName: user.userName}, process.env.JWT_SECRET);
        return res.json({status: 'ok', data: token});
    }

    res.json({status: 'error', error: 'Invalid password.'});
})

app.listen(port, () => {
    console.log("Server is up at " + port);
});