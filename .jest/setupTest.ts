import 'regenerator-runtime/runtime';

jest.mock('../src/config/index.ts', () => ({
    ENV_VARIABLES: {
        DB_URI: 'n/a'
    }
}));
