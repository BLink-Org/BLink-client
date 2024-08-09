export const API_ENDPOINTS = {
  TEST: {
    HEALTH: '/health',
  },
  AUTH: {
    GOOGLE: '/api/auth/oauth2/login/oauth2/code/google?code=:code',
    LOGIN_GOOGLE: '/api/auth/login/google',
    REISSUE: '/api/auth/reissue',
  },
};
