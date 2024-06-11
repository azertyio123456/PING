import { Transaction } from '../src/object_yourPieces/Transaction';
import { TransactionDB } from '../src/mongoose/TransactionDB';
import { userModel } from '../src/mongoose/UserDB';
import { boutiqueModel } from '../src/mongoose/BoutiqueDB';

describe('Transaction Model Test Suite', () => {
  const userData = {
    username: 'testusersssss',
    email: 'testuser@example.comsssss',
    gamification: {
      competence: ['coding', 'testing'],
      gold: 100,
      exp: 50,
      evolution_id: 1,
    }
  };

  const itemData = {
    name: 'Magic Wand',
    cost: 50,
    picture: 'wand.png',
    reward: {
      exp: 10,
      competence: ['magic'],
    }
  };

  let userId: number;
  let itemId: number;

  // Crée l'utilisateur et l'objet avant d'exécuter les tests
  beforeAll(async () => {
    const user = await userModel.create(userData);  // Crée un utilisateur
    userId = user._id as number;  // Stocke l'ID de l'utilisateur

    const item = await boutiqueModel.create(itemData);  // Crée un objet
    itemId = item._id as number;  // Stocke l'ID de l'objet
  });

  // Test de création et de sauvegarde de transaction
  it('should create and save a transaction successfully', async () => {
    const transaction = new Transaction(userId, itemId);

    const savedTransaction = new TransactionDB();
    await savedTransaction.SaveNewInstance(transaction.ToITransaction());
  });

  // Test de récupération de transaction par user_id
  it('should retrieve a transaction by user_id', async () => {
    const transactionDB = new TransactionDB();
    await transactionDB.RetrieveByCriteria({ user_id: userId });
    expect(transactionDB.GetDocument()).toBeDefined();
    expect(transactionDB.GetUserID(0)).toBe(userId);
  });
});
