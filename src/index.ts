import express, { json } from "express";

import routes from './routes';

const PORT = 3000;
const app = express();

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
app.use(json());
app.use(routes);
