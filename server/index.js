import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

import postRoutes from './routes/posts.js';
import userRoutes from './routes/users.js';


const app = express();
dotenv.config();


app.use(bodyParser.json({ limit: "30mb", extended: true}))
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true}))
app.use(cors());

// http://localhost:3001/posts
app.use('/posts', postRoutes);
// http://localhost:3001/user
app.use('/user', userRoutes)

app.get('/', (req, res) => {
  res.send('Hello to Memories API');
});

const CONNECTION_URL  = process.env.CONNECTION_URL;
const PORT = process.env.PORT || 3001;
const FOO = process.env.FOO;

mongoose.connect(CONNECTION_URL, { useNewURlParser: true, useUnifiedTopology: true })
  .then(() => app.listen(PORT, () => console.log(`Server running on port: ${PORT}`)))
  .catch((error) => console.log(error.message));
