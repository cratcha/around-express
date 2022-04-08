const path = require('path');

const readFile = require('../helpers/index');

const usersDataPath = path.join(__dirname, '../data/users.json');

const getUsers = (req, res) => {
  readFile(usersDataPath, res)
    .then((users) => res.status(200).send(users))
    .catch(() => res.status(500).send({ message: 'An error has occurred on the server' }));
};

const getUserbyId = (req, res) => {
  readFile(usersDataPath, res)
    .then((users) => users.find((user) => user._id === req.params.id))
    .then((user) => {
      if (!user) {
        res.status(404).send({ message: 'User ID not found' });
        return;
      }
      res.status(200).send(user);
    })
    .catch(() => res.status(500).send({ message: 'An error has occurred on the server' }));
};

module.exports = { getUsers, getUserbyId };
