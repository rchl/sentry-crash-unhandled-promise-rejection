import axios from 'axios'
import connect from 'connect'
import http from 'http'
import * as Sentry from "@sentry/node";

Sentry.init({
  dsn: 'https://11111111111111111111111111111111@111111.ingest.sentry.io/2348680',
  environment: 'development',
  // debug: true,
});

const app = connect()

// NOTE: This request handler makes the app crash on unhandled promise rejection.
app.use(Sentry.Handlers.requestHandler());

app.use(async function(req, res) {
  const promise = Promise.reject()

  // This effectively creates unhandled promise rejection.
  promise.then(() => {})

  // Respond to the request.
  await promise.catch(() => {
    res.end('Caught an error')
  })
})

http.createServer(app).listen(3000, async function onListening() {
  const response = await axios.get('http://localhost:3000/')
  console.log(response.data)
});
