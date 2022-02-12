const {KeyVaultClient, KeyVaultCredentials} = require('azure-keyvault');
const speakeasy = require('speakeasy');
const {createAuthenticator} = require('../utils/authenticator');
const {azure} = require('../config');

const createClient = (clientId, clientSecret) => {
  const authenticator = createAuthenticator(clientId, clientSecret)
  const credentials = new KeyVaultCredentials(authenticator);
  return new KeyVaultClient(credentials);
};

const createSecret = (length = 60) => {
  return speakeasy.generateSecret({ length });
};

const storeSecret = async (id, secret) => {
  const client = createClient(azure.keyVault.clientId, azure.keyVault.clientSecret);

  await client.setSecret(azure.keyVault.uri, id, secret);
};

const getSecret = async (id) => {
  const client = createClient(azure.keyVault.clientId, azure.keyVault.clientSecret);

  return await client.getSecret(azure.keyVault.uri, id, '');
};

module.exports = {createSecret, storeSecret, getSecret};
