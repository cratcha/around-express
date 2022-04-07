const path = require('path');

const { getDataFromFile } = require('../helpers/index');

const usersDataPath = path.join(__dirname, ',,/data/users.json');

const getUsers = (req, res) => {
  getDataFromFile(usersDataPath)
    .then((users) => res.status(200).send(users))
    .catch((err) => res.status(500).send(err));
};

const getUserbyId = (req, res) => {
  getDataFromFile(usersDataPath)
    .then((users) => users.find((user) => user.id.toString() === req.params.id))
    .then((user) => {
      if (!user) {
        res.status(404).send('This user doesnt exist');
      } else {
        res.status(200).send(user);
      }
    })
    .catch((err) => res.status(500).send(err));
};

module.exports = { getUsers, getUserbyId };
