const {AuthenticationContext} = require('adal-node');

const createAuthenticator = (clientId, clientSecret) => (challenge, callback) => {
  const context = new AuthenticationContext(challenge.authorization);

  return context.acquireTokenWithClientCredentials(challenge.resource, clientId, clientSecret, (err, response) => {
    if (err) throw err;

    const authorizationValue = `${response.tokenType} ${response.accessToken}`;

    return callback(null, authorizationValue);
  });
};

module.exports = {createAuthenticator};