import 'regenerator-runtime/runtime';

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
