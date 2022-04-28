const path = require('path');

const User = require('../models/user');

const getUsers = (req, res) => {
  User.find({})
    .orFail()
    .then((users) => res.status(200).send(users))
    .catch(() =>
      res.status(500).send({ message: 'An error has occurred on the server' })
    );
};

const getUserbyId = (req, res) => {
  const { userId } = req.params;

  User.findById(userId)
    .orFail()
    .then((users) => users.find((user) => user._id === req.params.id))
    .then((user) => {
      if (!user) {
        res.status(404).send({ message: 'User ID not found' });
        return;
      }
      res.status(200).send(user);
    })
    .catch(() =>
      res.status(500).send({ message: 'An error has occurred on the server' })
    );
};

const createUser = (req, res) => {
  const { name, about, avatar } = req.body;

  User.create({ name, about, avatar })
    .then((user) => res.send({ data: user }))
    .catch((err) => res.status(500).send({ message: 'Error' }));
};

module.exports = { getUsers, getUserbyId, createUser };
