const express = require('express');
const {createSecret, storeSecret, getSecret} = require('./services/secret');
const {verify} = require('./services/totp');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json());

app.post('/secret', async (req, res, next) => {
  try {
    const {userId} = req.body;

    if (!userId) {
      throw new Error('Parameter userId is required');
    }

    const secret = createSecret(20);

    await storeSecret(userId, secret.base32);

    res.status(201).json({ secret: secret.otpauth_url });
  } catch (err) {
    next(err);
  }
});

app.post('/verify', async (req, res, next) => {
  try {
    const {userId, token} = req.body;

    if (!userId) {
      throw new Error('Parameter userId is required');
    }

    if (!token) {
      throw new Error('Parameter token is required');
    }

    const secret = await getSecret(userId);
    
    const verified = verify(token, secret.value);

    if (!verified) {
      throw new Error('The token is incorrect');
    }

    res.json({ status: 'Ok' });
  } catch (err) {
    next(err);
  }
});

app.use((err, req, res, next) => {
  res.status(500).json({ error: err.message });
});

module.exports = app;
