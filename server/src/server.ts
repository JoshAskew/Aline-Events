const forceDatabaseRefresh = false;
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import routes from './routes/index.js';
import { sequelize } from './models/index.js';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.static('../client/dist'));

//parse out body of the request from the front end and parses it to req.body
app.use(express.json());
app.use(cors());
app.use(routes);

app.get('*', (_req, res) => {
  res.sendFile(path.join(__dirname, '../../client/dist/index.html'));
});

// sequalize is the connection to the libaray, sync synconize the models with the tables, forceDatabaseRefresh = will not overwrite tables 
//waiting for database to turn on, then express server turns on the port to start server
sequelize.sync({ force: forceDatabaseRefresh }).then(() => {
  app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
  });
});

