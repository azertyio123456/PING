import { Moongose } from '../src/mongoose/moongose';

beforeAll(async () => {
  await Moongose.ConnectToDatabase();
}, 30000); // Augmenter le timeout à 30000ms

afterAll(async () => {
  await Moongose.DisconnectFromDatabase();
}, 30000); // Augmenter le timeout à 30000ms
