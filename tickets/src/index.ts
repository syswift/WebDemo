import {app} from './app'
import mongoose from 'mongoose';
import { natsWrapper } from './nats-wrapper';

const start = async () => {
    if(!process.env.JWT_KEY) {
        throw new Error('JWT_KEY not found!');
    }
    if(!process.env.MONGO_URI){
        throw new Error('MONGO_URI must be defined');
    }
    if(!process.env.NATS_CLIENT_ID){
        throw new Error('MONGO_URI must be defined');
    }
    if(!process.env.NATS_URL){
        throw new Error('MONGO_URI must be defined');
    }
    if(!process.env.NATS_CLUSTER_ID){
        throw new Error('MONGO_URI must be defined');
    }

    try{
        await natsWrapper.connect(
            process.env.NATS_CLUSTER_ID,
            process.env.NATS_CLIENT_ID,
            process.env.NATS_URL
        );
        natsWrapper.client.on('close', () => {
            console.log('NATS connection closed!');
            process.exit();
        });
        process.on('SIGINT', () => natsWrapper.client.close());
        process.on('SIGTERM', () => natsWrapper.client.close());

        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        });
        console.log('Connected to MongoDb'+process.env.MONGO_URI);
    } catch (err){
        console.error(err);
    }

    const port = process.env.PORT || 5000;

    app.listen(port, ()=>{
        console.log(`tickets service listening on port ${port}!`);
    });
};

start();