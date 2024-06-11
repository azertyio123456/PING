module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  roots: ['<rootDir>/databaseEngine/test'],
  setupFilesAfterEnv: ['<rootDir>/databaseEngine/test/setup.ts'],
};
