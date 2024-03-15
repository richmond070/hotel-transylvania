import express from 'express';
import path from 'path';

const app = express();

const PORT = process.env.PORT || 3000

const server = app.listen(PORT, () => console.log(`server is running on ${PORT}`))

app.use(express.static('public'))