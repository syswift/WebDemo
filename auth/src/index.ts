import {app} from './app'
import mongoose from 'mongoose';

const start = async () => {
    if(!process.env.JWT_KEY) {
        throw new Error('JWT_KEY not found!');
    }
    if(!process.env.MONGO_URI){
        throw new Error('MONGO_URI must be defined');
    }

    try{
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        });
        console.log('Connected to MongoDb '+process.env.MONGO_URI);
    } catch (err){
        console.error(err);
    }

    const port = process.env.PORT || 5000;

    app.listen(port, ()=>{
        console.log(`Listening on port ${port}!`);
    });
};

start();