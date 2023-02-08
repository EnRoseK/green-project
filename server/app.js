import { nanoid } from 'nanoid';
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import fs from 'fs';
const app = express();
const port = 8000;

let categories = JSON.parse(fs.readFileSync('categoryData.json', 'utf-8'));
let articles = JSON.parse(fs.readFileSync('articleData.json', 'utf-8'));
let products = JSON.parse(fs.readFileSync('productsData.json', 'utf-8'));

let users = [{ id: 1, email: 'enrosek95@gmail.com', password: 'Kingenrose123~', token: nanoid() }];

let curUser;

app.use(cors());
app.use(bodyParser.json());

const checkToken = (token) => {
  let result = false;

  users.map((user) => {
    if (user.token === token) result = true;
  });

  return result;
};

// Menu Positions Routes
let menuPositions = JSON.parse(fs.readFileSync('menuPositions.json', 'utf-8'));

app.get('/menu-positions', (req, res) => {
  res.json(menuPositions);
});

app.get('/menu-positions/:id', (req, res) => {
  const { id } = req.params;
  let position = null;

  for (const row of menuPositions) {
    if (id == row.id) {
      position = row;
      break;
    }
  }

  res.json(position);
});

let nextPosId = menuPositions.length + 1;

app.post('/menu-positions', (req, res) => {
  const { name, alias } = req.body;
  const newPosition = { id: nextPosId++, name, alias };
  menuPositions.push(newPosition);
  fs.writeFileSync('menuPositions.json', JSON.stringify(menuPositions));
  res.json(newPosition);
});

app.delete('/menu-positions/:id', (req, res) => {
  let { id } = req.params;
  id = Number(id);
  menuPositions = menuPositions.filter((position) => position.id !== id);
  fs.writeFileSync('menuPositions.json', JSON.stringify(menuPositions));
  res.json(id);
});

// Menus Routes
let menus = JSON.parse(fs.readFileSync('menus.json', 'utf-8'));

app.get('/menus', (req, res) => {
  const { positionId } = req.query;
  if (!positionId) return res.status(400).json('PositionId Required!');

  const result = menus.filter((menu) => {
    return menu.positionId === Number(positionId);
  });

  return res.json(result);
});

app.get('/menus/:positionAlias', (req, res) => {
  const { positionAlias } = req.params;
  let position;

  for (let row of menuPositions) {
    if (row.alias === positionAlias) {
      position = row;
      break;
    }
  }

  const result = menus.filter((menu) => menu.positionId === position.id);

  res.json(result);
});

app.post('/menus', (req, res) => {
  const { positionId } = req.query;
  if (!positionId) return res.status(400).json('PositionId Required!');

  const { name, link, newTab, ordering } = req.body;
  const newMenu = { id: menus[menus.length - 1].id + 1, name, link, newTab, ordering, positionId: Number(positionId) };
  menus.push(newMenu);
  fs.writeFileSync('menus.json', JSON.stringify(menus));
  res.json(newMenu);
});

app.delete('/menus/:id', (req, res) => {
  let { id } = req.params;
  id = Number(id);

  menus = menus.filter((menu) => menu.id !== id);
  fs.writeFileSync('menus.json', JSON.stringify(menus));
  res.json(id);
});

app.patch('/menus/:id', (req, res) => {
  let { id } = req.params;
  id = Number(id);

  const { name, link, newTab, ordering } = req.body;
  let updatedMenu;

  menus = menus.map((menu) => {
    if (menu.id === id) {
      updatedMenu = {
        id,
        name,
        link,
        newTab,
        ordering,
        positionId: menu.positionId,
      };
      return updatedMenu;
    }

    return menu;
  });

  fs.writeFileSync('menus.json', JSON.stringify(menus));
  res.json(updatedMenu);
});

// Products Routes
app.get('/products', (req, res) => {
  let { pageSize, page, q, priceFrom, priceTo, sortPrice, sortName } = req.query;
  pageSize = Number(pageSize) || 10;
  page = Number(page) || 1;
  priceFrom = Number(priceFrom);
  priceTo = Number(priceTo);

  let items = [...products];

  if (q) items = items.filter((item) => item.name.toLowerCase().includes(q.toLowerCase()));

  if ((priceFrom || priceFrom === 0) && (priceTo || priceTo === 0))
    items = items.filter((item) => item.price >= priceFrom && item.price <= priceTo);

  if (sortPrice) {
    items.sort((a, b) => a.price - b.price);
    sortPrice === 'toLow' && items.reverse();
  }

  if (sortName) {
    items.sort((a, b) => {
      if (a.name > b.name) return 1;
      if (a.name < b.name) return -1;
      return 0;
    });
    sortName === 'toLow' && items.reverse();
  }

  const total = items.length;
  const totalPages = Math.ceil(total / pageSize);

  items = items.slice((page - 1) * pageSize, page * pageSize);
  const result = {
    total,
    totalPages,
    page,
    pageSize,
    items,
  };

  res.json(result);
});

// Categories Routes

const updateCategoriesFile = () => fs.writeFileSync('categoryData.json', JSON.stringify(categories));

app.get('/categories', (req, res) => {
  res.json(categories);
});

app.get('/categories/:id', (req, res) => {
  let { id } = req.params;
  id = Number(id);
  let category;

  for (let cat of categories) {
    if (cat.id === id) {
      category = cat;
      break;
    }
  }

  res.json(category);
});

app.post('/categories', (req, res) => {
  // if (!curUser) return res.status(401).send(`Unauthorized account`);

  // if (!checkToken(req.headers.authorization)) return res.status(403).send(`Invalid token`);

  const newCategory = { id: categories[categories.length - 1].id + 1, ...req.body };
  categories.push(newCategory);
  updateCategoriesFile();
  res.json(newCategory);
});

app.patch('/categories/:id', (req, res) => {
  // if (!curUser) return res.status(401).send(`Unauthorized account`);

  // if (!checkToken(req.headers.authorization)) return res.status(403).send(`Invalid token`);

  let { id } = req.params;
  id = Number(id);
  categories = categories.map((category) => {
    if (category.id === id) return { id, ...req.body };
    return category;
  });
  updateCategoriesFile();

  res.json({ id, ...req.body });
});

app.delete('/categories/:id', (req, res) => {
  // if (!curUser) return res.status(401).send(`Unauthorized account`);

  // if (!checkToken(req.headers.authorization)) return res.status(403).send(`Invalid token`);

  let { id } = req.params;
  id = Number(id);

  categories = categories.filter((category) => {
    if (category.id !== id) return category;
  });
  updateCategoriesFile();

  res.json(id);
});

// Articles Routes

const updateArticlesFile = () => fs.writeFileSync('articleData.json', JSON.stringify(articles));

app.get('/articles', (req, res) => {
  res.status(200);
  res.json(articles);
});

app.get('/articles/:id', (req, res) => {
  const { id } = req.params;
  let newArticle;
  for (let article of articles) {
    if (article.id === Number(id)) {
      newArticle = article;
      break;
    }
  }

  res.json(newArticle);
});

app.post('/articles', (req, res) => {
  // if (!curUser) return res.status(401).send(`Unauthorized account`);

  // if (!checkToken(req.headers.authorization)) return res.status(403).send(`Invalid token`);

  const newArticle = { id: articles[articles.length - 1].id + 1, ...req.body };
  articles.push(newArticle);
  updateArticlesFile();
  res.json(newArticle);
});

app.patch('/articles/:id', (req, res) => {
  // if (!curUser) return res.status(401).send(`Unauthorized account`);

  // if (!checkToken(req.headers.authorization)) return res.status(403).send(`Invalid token`);

  let { id } = req.params;
  id = Number(id);
  articles = articles.map((article) => {
    if (article.id === id) return { id, ...req.body };
    return article;
  });
  updateArticlesFile();

  res.json({ id, ...req.body });
});

app.delete('/articles/:id', (req, res) => {
  // if (!curUser) return res.status(401).send(`Unauthorized account`);

  // if (!checkToken(req.headers.authorization)) return res.status(403).send(`Invalid token`);

  let { id } = req.params;
  id = Number(id);

  articles = articles.filter((article) => {
    if (article.id !== id) return article;
  });
  updateArticlesFile();

  res.json(id);
});

app.get('/articles/categories/:id', (req, res) => {
  const { id } = req.params;

  res.json(
    articles.filter((article) => {
      if (article.categoryId === Number(id)) return article;
    })
  );
});

// Users Routes
app.get('/users', (req, res) => {
  res.send(users);
});

app.post('/signin', (req, res) => {
  const { email, password } = req.body;
  let isExists = false;

  users.map((user) => {
    if (user.email === email) {
      isExists = true;
      curUser = user;
    }
  });

  if (!isExists) {
    res.status(404).send({
      message: `User didn't found`,
    });
  }

  if (curUser.email !== email || curUser.password !== password) {
    res.status(400).send({
      message: "Email or password doesn't match",
    });
  }

  res.send({
    message: 'Success',
    body: curUser.token,
  });
});

app.post('/signup', (req, res) => {
  const lowerLetters = 'abcdefghijklmnopqrstuvwxyz';
  const upperLetters = lowerLetters.toUpperCase();
  const numbers = '0123456789';
  const specials = '@$!%*#?&.~';

  const checkLowerLetters = (pass) => {
    let result = false;
    for (let letter of lowerLetters) {
      if (pass.includes(letter)) {
        result = true;
        break;
      }
    }

    return result;
  };

  const checkUpperLetters = (pass) => {
    let result = false;
    for (let letter of upperLetters) {
      if (pass.includes(letter)) {
        result = true;
        break;
      }
    }

    return result;
  };

  const checkNumbers = (pass) => {
    let result = false;
    for (let letter of numbers) {
      if (pass.includes(letter)) {
        result = true;
        break;
      }
    }

    return result;
  };

  const checkSpecials = (pass) => {
    let result = false;
    for (let letter of specials) {
      if (pass.includes(letter)) {
        result = true;
        break;
      }
    }

    return result;
  };

  const checkPassword = (pass) => {
    if (
      checkLowerLetters(pass) &&
      checkUpperLetters(pass) &&
      checkNumbers(pass) &&
      checkSpecials(pass) &&
      pass.length > 8
    )
      return true;

    return false;
  };

  const { email, password, repassword } = req.body;

  for (let user of users) {
    if (user.email === email) return res.status(400).send({ message: `Email already exists` });
  }

  if (password !== repassword)
    return res.status(400).send({ message: `Password doesn't match with repeated password` });

  if (!checkPassword(password)) return res.status(400).send({ message: `Password requirement invalid` });

  if (!password.includes('@') || !password.includes('.'))
    return res.status(400).send({ message: `Email type is wrong!` });

  const newUser = {
    id: users[users.length - 1].id + 1,
    email,
    password,
    token: nanoid(),
  };

  users.push(newUser);

  res.send({
    message: `Success`,
    body: newUser,
  });
});

app.post('/users/me', (req, res) => {
  res.json(curUser);
});

app.listen(port, () => console.log(`Server is running at http://localhost:${port}`));
