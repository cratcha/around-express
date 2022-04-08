const path = require('path');

const readFile = require('../helpers/index');

const cardsDataPath = path.join(__dirname, '../data/cards.json');

const getCards = (req, res) => {
  readFile(cardsDataPath)
    .then((cards) => res.status(200).send(cards))
    .catch(() => {
      res.status(500).send({ messaage: 'An error has occured on the server' });
    });
};

module.exports = { getCards };
