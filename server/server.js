import express from 'express';
import dotenv from 'dotenv';
import '@babel/polyfill';

import PartyController from './controllers/PartyController';
import UserController from './controllers/UserController';
import OfficeController from './controllers/OfficeController';
import VotesController from './controllers/VotesController';
import isAdmin from './middleware/AuthCheck';
import PartyValidation from './middleware/validation/PartyValidation';
import OfficeValidation from './middleware/validation/OfficeValidation';
import UserValidation from './middleware/validation/UserValidation';

import { uploader, cloudinaryConfig } from './config/cloudinaryConfig';
import { multerUploads, dataUri } from './middleware/multer';

dotenv.config();
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('*', cloudinaryConfig);

app.get('/', (req, res) => res.status(200));

app.get('/api/v2/parties/:id', PartyValidation.isIdAnInteger, PartyController.getOneParty);
app.get('/api/v2/parties', PartyController.allParty);
app.post('/api/v2/parties', isAdmin, PartyController.createParty);
app.patch('/api/v2/parties/:id/name', isAdmin, PartyValidation.isIdAnInteger, PartyValidation.isUpdateParty, PartyController.updateParty);
app.delete('/api/v2/parties/:id', isAdmin, PartyValidation.isIdAnInteger, PartyController.deleteParty);

app.post('/api/v2/offices', isAdmin, OfficeValidation.isCreateOfficeValid, OfficeController.createOffice);
app.get('/api/v2/offices', OfficeController.allOffice);
app.get('/api/v2/offices/:id', PartyValidation.isIdAnInteger, OfficeController.getOneOffice);

app.post('/api/v2/auth/login', UserValidation.isLoginValid, UserController.login);
app.post('/api/v2/auth/signup', UserValidation.isSignUpValid, UserController.createUser);

app.post('/api/v2/:id/register', VotesController.candidates);
app.post('/api/v2/votes', VotesController.votes);
app.get('/api/v2/office/:id/result', VotesController.totalVotes);

app.post('/upload', multerUploads, (req, res) => {
  if (req.file) {
    const file = dataUri(req).content;
    return uploader.upload(file).then((result) => {
      const image = result.url;
      return res.status(200).json({
        messge: 'Your image has been uploded successfully to cloudinary',
        data: {
          image,
        },
      });
    }).catch(err => res.status(400).json({
      messge: 'someting went wrong while processing your request',
      data: {
        err,
      },
    }));
  }
  return null;
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`app is listening on ${port}`);
});

export default app;
