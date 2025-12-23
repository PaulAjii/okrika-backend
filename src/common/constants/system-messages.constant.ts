export const SYSTEM_MESSAGES = {
  SERVER: {
    STARTUP: 'Okrika server has started successfully on http://localhost:{0}',
    API_DOC_STARTUP:
      'API documentation is available at http://localhost:{0}/api/docs',
    API_DOC_REFERENCE:
      'API Scalar Reference is available at http://localhost:{0}/api/reference',
    DATABASE_STARTUP: 'Database connection established successfully',
  },

  USER: {
    GET_ALL: 'All users fetched successfully',
    NOT_FOUND: 'No user found',
    FIND_ONE: 'User fetched successfully',
    CREATE: 'User created successfully',
    UPDATE: 'User updated successfully',
    DELETE: 'User deleted successfully',
  },

  AUTH: {
    LOGIN: 'User logged in successfully',
    REGISTER: 'User registered successfully',
    INVALID_CREDENTIALS: 'Invalid email or password',
    INVALID_TOKEN: 'Invalid or expired token',
    LOGOUT: 'User logged out successfully',
    EMPTY_FIELDS: 'Email and password fields cannot be empty',
    USER_EXIST: 'User with email: "{0}" already exists',
  },
};
