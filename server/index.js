import cors from 'cors';
import express from 'express';
import { configDotenv } from 'dotenv';

configDotenv();
const app = express();
const port =  process.env.PORT ||3000;

//this code is keep the server active as it gets down after few minutes of inactivity
setInterval(() => {
   console.log("Hail! I am still here!"); 
}, 300000);

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.post('/api/chat', (req, res) => {
    const { message } = req.body;
    if(!message) res.status(400).send('Message is required');
    res.send({response:message});
});

app.listen(port, () => console.log('Server started on port:', port));