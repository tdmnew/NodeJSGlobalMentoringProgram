import express from "express";
import { uuid } from "uuidv4";

import { User } from "./models/user";

const PORT = 3000;

const app = express();

app.listen(PORT);
app.use(express.json());
console.log(`Server running on port ${PORT}`);

let data: User[] = [];

const getAutoSuggestions = (loginSubstring: string, limit: number) => {
  return data
    .filter((user) => user.login.includes(loginSubstring))
    .sort((a, b) => a.login.localeCompare(b.login))
    .slice(0, limit);
};

app
  .route("/users/")
  .post((req, res) => {
    let user: User = req.body;
    user.id = uuid();
    user.isDeleted = false;

    data.push(user);
    res.send(user).status(200);
  })
  .get((req, res) => {
    const { loginSubstring = "", limit = 10 } = req.query;
    const sortedList: User[] = getAutoSuggestions(
      loginSubstring as string,
      limit as number
    );

    res.json(sortedList).status(200);
  });

app
  .route("/users/:id")
  .get((req, res) => {
    const id = req.params.id;
    const user: User | undefined = data.find((user) => user.id === id);

    if (user) {
      res.json(user).status(200);
    }
  })
  .put((req, res) => {
    const id = req.params.id;
    const { login, password, age } = req.body as User;

    let user: User | undefined = data.find((user) => user.id === id);

    if (user) {
      user.login = login;
      user.password = password;
      user.age = age;

      data.splice(data.indexOf(user), 1, user);

      res.send(user).status(200);
    }
  })
  .delete((req, res) => {
    const id = req.params.id;
    let user: User | undefined = data.find((user) => user.id === id);

    if (user) {
      user.isDeleted = true;
      data.splice(data.indexOf(user), 1, user);
      res.send(user).status(200);
    }
  });
