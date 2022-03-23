import 'regenerator-runtime/runtime';
// import SequelizeMock from 'sequelize-mock';
// const MockDB = new SequelizeMock();
//
// const mockGroup = MockDB.define('groups', {
//     id: '1',
//     name: 'Admin',
//     permisions: ['READ', 'WRITE', 'DELETE', 'SHARE', 'UPLOAD FILES']
// });

jest.mock('../src/config/index.ts', () => ({
    ENV_VARIABLES: {
        DB_URI: 'n/a'
    }
}));

jest.mock('../src/models/index.ts', () => ({
    User: jest.fn(),
    Group: jest.fn(),
    UserGroup: jest.fn()
}));
