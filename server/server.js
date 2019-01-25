import express from 'express';
import dotenv from 'dotenv';

import PartyController from './controllers/PartyController';

dotenv.config();
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => res.status(200));

app.post('/api/v1/party', PartyController.createParty);

app.listen(process.env.PORT, () => {
  console.log(`app is listening on ${process.env.PORT}`);
});

export default app;
