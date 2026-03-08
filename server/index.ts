import express from 'express';
import session from 'express-session';
import dotenv from 'dotenv';
import routes from './routes.js';

dotenv.config();

const app = express();
const port = Number(process.env.PORT ?? 3000);

app.use(express.json());
app.use(
  session({
    secret: process.env.SESSION_SECRET ?? 'change-me',
    resave: false,
    saveUninitialized: false,
    cookie: { secure: process.env.NODE_ENV === 'production' }
  })
);

app.use('/api', routes);

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/dist'));
  app.get('*', (_req, res) => res.sendFile('index.html', { root: 'client/dist' }));
}

app.listen(port, () => {
  console.log(`helioz server listening on http://localhost:${port}`);
});
