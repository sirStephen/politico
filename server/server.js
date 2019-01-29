import express from 'express';
import dotenv from 'dotenv';

import PartyController from './controllers/PartyController';
import UserController from './controllers/UserController';
import isAdmin from './middleware/Privilege';
import PartyValidation from './middleware/validation/PartyValidation';

dotenv.config();
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => res.status(200));

app.get('/api/v1/parties/:id', PartyController.getOneParty);
app.get('/api/v1/parties', PartyController.allParty);
app.post('/api/v1/parties', isAdmin, PartyValidation.isCreatePartyValid, PartyController.createParty);
app.delete('/api/v1/parties/:id', isAdmin, PartyController.deleteParty);

app.post('/api/v1/login', UserController.login);

app.listen(process.env.PORT, () => {
  console.log(`app is listening on ${process.env.PORT}`);
});

export default app;
