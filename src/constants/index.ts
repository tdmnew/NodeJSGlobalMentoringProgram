const CONSTANTS = {
    CONTROLLER_RESPONSE: {
        CREDENTIALS_INCORRECT: 'Username or Password Incorrect',
        LOGIN_SUCCESSFUL: 'Successfully logged in',
        REGISTER_SUCCESSFUL: 'Successfully registered',
        REGISTER_UNSUCCESSFUL:
            'Registration could not be completed at this time. Please try again later.',
        REGISTER_USER_EXISTS:
            'A user already exists with this login. Please try again with a different name',
        USER_NOT_FOUND: 'User not found',
        USERS_NOT_FOUND: 'Users could not be found with the given arguements',
        GROUPS_NOT_FOUND: 'Groups could not be found with the given arguements',
        GROUP_NOT_FOUND: 'Group not found',
        UNAUTHORIZED: 'Unauthorized',
        FORBIDDEN: 'Forbidden'
    },
    VALIDATION: {
        USERS: {
            LOGIN_FIELD_EMPTY: 'Please enter a login',
            PASSWORD_FIELD_EMPTY: 'Please enter a password',
            PASSWORD_PATTERN_INCORRECT:
                'Password must contain a letter and number',
            AGE_FIELD_EMTPY: 'Please enter an age',
            AGE_PATTERN_INCORRECT: 'Age must be between 4 and 130',
            AUTO_SUGGESTIONS: {
                SUBSTRING: '',
                LIMIT: 10
            }
        },
        GROUPS: {
            NAME_FIELD_EMPTY: 'Please enter a group name',
            PERMISSIONS_FIELD_EMPTY:
                'Please enter one or more permissions for this group',
            PERMISSIONS_PATTERN_INCORRECT:
                'Permissions must be between 1 and 5, and contain a valid type',
            GROUP_ID_EMPTY: 'Please enter a valid group id',
            USER_IDS_PATTERN_INCORRECT: 'Please enter one more or user ids'
        }
    },
    JWT_STATUS: {
        NO_AUTH_TOKEN: 'No auth token',
        INVALID_TOKEN: 'invalid token',
        JWT_EXPIRED: 'jwt expired',
        JWT_MALFORMED: 'jwt malformed'
    }
};

export default CONSTANTS;
