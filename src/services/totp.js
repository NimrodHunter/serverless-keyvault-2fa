const speakeasy = require('speakeasy');

const verify = (token, secret) => {
  const encoding = 'base32';
  return speakeasy.totp.verify({
    secret,
    token,
    encoding,
  });
};

module.exports = {verify};
