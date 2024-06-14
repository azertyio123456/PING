import { ItemShop } from '../src/object_yourPieces/ItemShop';
import { BoutiqueDB} from '../src/mongoose/BoutiqueDB';

describe('Boutique Model Test Suite', () => {
  const itemData = {
    name: 'Magic Wand',
    cost: 50,
    picture: 'wand.png',
    reward: {
      exp: 10,
      competence: ['magic'],
    }
  };

  it('should create and save an item successfully', async () => {
    const item = new ItemShop(
      itemData.name,
      itemData.cost,
      itemData.picture,
      itemData.reward
    );

    const savedItem = new BoutiqueDB();
    await savedItem.SaveNewInstance(item.ToIBoutique());
  });

  it('should retrieve an item by name', async () => {
    const shopDB = new BoutiqueDB();
    await shopDB.RetrieveByCriteria({name: itemData.name})
    expect(shopDB.GetDocument()).toBeDefined();
    expect(shopDB.GetName(0)).toBe(itemData.name);
  });
});
