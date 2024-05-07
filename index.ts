import express from 'express';
import bodyParser from 'body-parser';
import routes from './routes/index';
import cors from 'cors';
import connectDb from './db';
import path from 'path';
const app = express();

const PORT = process.env.PORT || 6000;

connectDb();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Apply CORS policy to all routes
app.use(cors());

app.use('/images', express.static(path.join(__dirname, 'upload/images')));
app.use('/', routes);

app.listen(PORT, () => {
	console.log(`Server is running on http://localhost:${PORT}`);
});
