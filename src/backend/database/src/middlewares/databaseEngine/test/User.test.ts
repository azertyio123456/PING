import { User } from '../src/object_yourPieces/Users';
import { UserDB } from '../src/mongoose/UserDB';

describe('User Model Test Suite', () => {
  const userData = {
    username: 'testuserss',
    email: 'testuser@example.comss',
    gamification: {
      competence: ['codings', 'testings'],
      gold: [],
      exp: [],
      evolution_id: 1,
      path_image: "",
      lines_written: [],
        errors: []
    }
  };

  it('should create and save a user successfully', async () => {
    const user = new User(
      userData.username,
      userData.email,
      userData.gamification,
    );

    const savedUser = new UserDB();
    await savedUser.SaveNewInstance(user.ToIUser());
  });

  it('should retrieve a user by username', async () => {
    const userDB = new UserDB();
    await userDB.RetrieveByCriteria({ username: userData.username });
    expect(userDB.GetDocument()).toBeDefined();
    expect(userDB.GetUsername(0)).toBe(userData.username);
  });
});
