import express from 'express';
import {json} from 'body-parser';
import {currentUserRouter} from './routes/currentUser';

const app = express();
app.use(json());
app.use(currentUserRouter);

const port = process.env.PORT || 5000;

app.listen(port, ()=>{
    console.log(`Listening on port ${port}!`);
})