module.exports = {
  azure: {
    keyVault: {
      clientId: process.env.KV_CLIENT_ID,
      clientSecret: process.env.KV_CLIENT_SECRET,
      uri: process.env.KV_URI,
    }
  },
  server: {
    port: process.env.PORT || 8080,
  },
};
