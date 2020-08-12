import sirv from 'sirv';
//import polka from 'polka';
import mongoose from 'mongoose'
import express, { urlencoded } from 'express'
import passport from 'passport'
import session from 'express-session'
import connectMongo from 'connect-mongo'
//import compression from 'compression';
import * as sapper from '@sapper/server';
import User from './models/user'
import Partido from './models/partido'
import index from './api/index'
require('dotenv').config()
const server = express()
server.use(express.json())
server.use(urlencoded({extended:true}))

const MongoStore = connectMongo(session)

const { PORT, NODE_ENV } = process.env;
const dev = NODE_ENV === 'development';

mongoose.connect(process.env.DB_STRING, {
	useNewUrlParser: true,
	useCreateIndex: true,
	useUnifiedTopology: true,
})
.then(() => console.log(`database connected`))
.catch(err => console.log(err))


server.use(session({
	secret: process.env.SESSION_SECRET,
	resave: false,
	saveUninitialized: true,
	store: new MongoStore({ mongooseConnection: mongoose.connection }),
	cookie: {
		maxAge: 1000*60*60*24*15
	}
}))
passport.use(User.createStrategy())
passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())
server.use(passport.initialize())
server.use(passport.session())
server.use('/api', index)
server.use(sirv('static', {dev}))
server.use(sapper.middleware())

server.listen(PORT, () => 'working')

// polka() // You can also use Express
// 	.use(
// 		compression({ threshold: 0 }),
// 		sirv('static', { dev }),
// 		sapper.middleware()
// 	)
// 	.listen(PORT, err => {
// 		if (err) console.log('error', err);
// 	});
