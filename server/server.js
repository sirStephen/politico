import express from 'express';
import dotenv from 'dotenv';

dotenv.config();
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => res.send('Hello world'));

app.listen(process.env.PORT, () => {
  console.log(`app is listening on ${process.env.PORT}`);
});
