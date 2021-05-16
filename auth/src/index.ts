import express from 'express';
import {json} from 'body-parser';

const app = express();
app.use(json());
const port = process.env.PORT || 5000;

app.listen(port, ()=>{
    console.log(`Listening on port ${port}!`);
})