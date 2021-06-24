const express = require('express');
const keys = require('./config/keys');
const plaid = require('plaid');

const app = express();
app.use(express.json());

const client = new plaid.Client({
  clientID: keys.PLAID_CLIENT_ID,
  secret: keys.PLAID_SECRET,
  env: plaid.environments.sandbox,
});

app.post('/create_link_token', async (request, response) => {
  try {
    // Get the client_user_id by searching for the current user
    // const user = await User.find();
    // const clientUserId = user.id;

    // Create the link_token with all of your configurations
    const tokenResponse = await client.createLinkToken({
      user: {
        client_user_id: 'test-user-id',
      },
      client_name: 'Plaid Test App',
      products: ['transactions'],
      country_codes: ['US'],
      language: 'en',
      webhook: 'https://webhook.sample.com',
    });

    response.json(tokenResponse)

  } catch(e) {
    // display error on client
    return response.send({ error: e.message });
  }
});

app.post('/exchange_plaid_token', async (request, response) => {
  try {
    const publicToken = request.body.public_token;

    // Exchange the client-side public_token for a server access_token
    const tokenResponse = await client.exchangePublicToken(publicToken);

    // Save the access_token and item_id to a persistent database
    const accessToken = tokenResponse.access_token;
    const itemId = tokenResponse.item_id;
  } catch(e) {
    return response.send({ error: e.message });
  }
});