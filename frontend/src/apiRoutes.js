const BASE_URL = "/api/v1";

const API_ROUTES = {
  messages: {
    base: () => `${BASE_URL}/messages`,
    byId: (messageId) => `${BASE_URL}/messages/${messageId}`,
  },
  channels: {
    base: () => `${BASE_URL}/channels`,
    byId: (channelId) => `${BASE_URL}/channels/${channelId}`,
  },
  auth: {
    signup: () => `${BASE_URL}/signup`,
    login: () => `${BASE_URL}/login`,
  },
};

export default API_ROUTES;
