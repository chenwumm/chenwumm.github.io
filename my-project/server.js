const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const fs = require('fs');
const path = require('path');
const cors = require('cors');

const app = express();
const port = 3000;

// 配置密钥和数据库URL
const JWT_SECRET = 'your-secret-key';
const USERS_FILE = path.join(__dirname, 'users.json');

// 初始化用户文件
if (!fs.existsSync(USERS_FILE)) {
  fs.writeFileSync(USERS_FILE, '[]');
}

// 中间件
app.use(cors());
app.use(bodyParser.json());

// 注册路由
app.post('/register', (req, res) => {
  const { username, password } = req.body;
  const users = JSON.parse(fs.readFileSync(USERS_FILE));
  const hashedPassword = bcrypt.hashSync(password, 10);

  if (users.some(user => user.username === username)) {
    return res.status(400).send('用户名已存在');
  }

  users.push({ username, password: hashedPassword });
  fs.writeFileSync(USERS_FILE, JSON.stringify(users));
  res.status(201).send('注册成功');
});

// 登录路由
app.post('/login', (req, res) => {
  const { username, password } = req.body;
  const users = JSON.parse(fs.readFileSync(USERS_FILE));

  const user = users.find(user => user.username === username);
  if (!user) {
    return res.status(400).send('用户名或密码错误');
  }

  const passwordMatch = bcrypt.compareSync(password, user.password);
  if (!passwordMatch) {
    return res.status(400).send('用户名或密码错误');
  }

  const token = jwt.sign({ username }, JWT_SECRET);
  res.status(200).json({ token });
});

// 启动服务器
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
