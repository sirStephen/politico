import express from 'express';
import dotenv from 'dotenv';

import PartyController from './controllers/PartyController';
import UserController from './controllers/UserController';
import OfficeController from './controllers/OfficeController';
import isAdmin from './middleware/Privilege';
import PartyValidation from './middleware/validation/PartyValidation';
import OfficeValidation from './middleware/validation/OfficeValidation';

dotenv.config();
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => res.status(200));

app.get('/api/v1/parties/:id', PartyValidation.isIdAnInteger, PartyController.getOneParty);
app.get('/api/v1/parties', PartyController.allParty);
app.post('/api/v1/parties', isAdmin, PartyValidation.isCreatePartyValid, PartyController.createParty);
app.put('/api/v1/parties/:id', isAdmin, PartyValidation.isIdAnInteger, PartyValidation.isCreatePartyValid, PartyController.updateParty);
app.delete('/api/v1/parties/:id', isAdmin, PartyValidation.isIdAnInteger, PartyController.deleteParty);

app.post('/api/v1/office', isAdmin, OfficeValidation.isCreateOfficeValid, OfficeController.createOffice);

app.get('/api/v1/office', OfficeController.allOffice);

app.get('/api/v1/office/:id', PartyValidation.isIdAnInteger, OfficeController.getOneOffice);

app.post('/api/v1/login', UserController.login);

app.listen(process.env.PORT, () => {
  console.log(`app is listening on ${process.env.PORT}`);
});

export default app;
