import {app} from './app'
import mongoose from 'mongoose';

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