import './App.css';

function App() {
  const linkHandler = Plaid.create({
    token: (await $.post('/create_link_token')).link_token,
    onSuccess: (public_token, metadata) => {
      // send the public_token to your app server
      $.post('/exchange_public_token', {
        public_token: public_token,
      });
    },
    onExit: (err, metadata) => {
      //Optionally capture link flow events, streamed through
      // this callback as your users connect an Item to Plaid
    },
    onEvent: (eventName, metadata) => {
      // Optionally capture Link flow events, streamed through
      // this callback as your users connect an Item to Plaid
    },
  });

  linkHandler.open();

  return (
    <div className="App">
      <h1>Hello from client side!</h1>
    </div>
  );
}

export default App;
