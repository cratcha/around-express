const path = require('path');

const User = require('../models/user');
const {
  HTTP_SUCCESS_OK,
  HTTP_CLIENT_ERROR_BAD_REQUEST,
  HTTP_CLIENT_ERROR_NOT_FOUND,
  HTTP_INTERNAL_SERVER_ERROR,
} = require('../utils/error');

const getUsers = (req, res) => {
  User.find({})
    .orFail()
    .then((users) => res.status(HTTP_SUCCESS_OK).send(users))
    .catch(() =>
      res
        .status(HTTP_INTERNAL_SERVER_ERROR)
        .send({ message: 'An error has occurred on the server' })
    );
};

const getUserbyId = (req, res) => {
  const { userId } = req.params;

  User.findById(userId)
    .orFail()
    .then((users) => users.find((user) => user._id === req.params.id))
    .then((user) => {
      if (!user) {
        res
          .status(HTTP_CLIENT_ERROR_NOT_FOUND)
          .send({ message: 'User ID not found' });
        return;
      }
      res.status(HTTP_SUCCESS_OK).send(user);
    })
    .catch(() =>
      res
        .status(HTTP_INTERNAL_SERVER_ERROR)
        .send({ message: 'An error has occurred on the server' })
    );
};

const createUser = (req, res) => {
  const { name, about, avatar } = req.body;

  User.create({ name, about, avatar })
    .then((user) => res.send({ data: user }))
    .catch((err) =>
      res.status(HTTP_INTERNAL_SERVER_ERROR).send({ message: 'Error' })
    );
};

module.exports = { getUsers, getUserbyId, createUser };
