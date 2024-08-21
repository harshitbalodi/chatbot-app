import cors from 'cors';
import express from 'express';


const app = express();
const port = 3000 || process.env.PORT;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.post('/api/chat', (req, res) => {
    const { message } = req.body;
    if(!message) res.status(400).send('Message is required');
    res.send(message);
})

app.listen(3000, () => console.log('Server started on port:', port));