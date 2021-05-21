import express from 'express';
import 'express-async-errors';
import {json} from 'body-parser';
import mongoose from 'mongoose';
import cookieSession from 'cookie-session';

import {currentUserRouter} from './routes/currentUser';
import { signinRouter } from './routes/signin';
import { signoutRouter } from './routes/signout';
import { signupRouter } from './routes/signup';
import { errorHandler } from './middlewares/error-handler';
import { NotFoundError } from './errors/not-found-error';

const app = express();
app.set('trust proxy', true);
app.use(json());
app.use(
    cookieSession({
        signed: false,
        secure: true
    })
);
//routes
app.use(currentUserRouter);
app.use(signinRouter);
app.use(signoutRouter);
app.use(signupRouter);

app.all('*', async (req, res) => {  //request not found
    throw new NotFoundError();
});

app.use(errorHandler);

const start = async () => {
    if(!process.env.JWT_KEY) {
        throw new Error('JWT_KEY not found!');
    }

    try{
        await mongoose.connect('mongodb://auth-mongo-srv:27017/auth', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        });
        console.log('Connected to MongoDb');
    } catch (err){
        console.error(err);
    }

    const port = process.env.PORT || 5000;

    app.listen(port, ()=>{
        console.log(`Listening on port ${port}!`);
    });
};

start();