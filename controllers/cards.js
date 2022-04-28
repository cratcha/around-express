const path = require('path');
const Card = require('../models/card');

// GET
const getCards = (req, res) => {
  Card.find({})
    .then((cards) => res.status(200).send(cards))
    .catch(() => {
      res.status(500).send({ messaage: 'An error has occured on the server' });
    });
};

//POST
const createCard = (req, res) => {
  const { name, link } = req.body;
  const owner = req.user._id;
  Card.create({ name, link, owner })
    .then((card) => res.status(200).send(card))
    .catch((err) => {
      if (err.name === 'ValidatorError') {
        res.status(400).send({ message: getErrorMsg(err) });
      } else {
        res.status(500).send({ message: 'An error has occured on the server' });
      }
    });
};

//DELETE
const deleteCard = (req, res) => {
  const { cardId } = req.params;
  Card.findByIdAndDelete(cardId)
    .orFail()
    .then((card) => res.status(200).send(card))
    .catch((err) => {
      if (err.name === 'CardNotFoundError') {
        res.status(404).send({ message: 'Card not found' });
      } else if (err.name === 'CastError') {
        res
          .status(400)
          .send({ message: 'Invalid Card ID passed for deleting a card' });
      } else {
        res.status(500).send({ message: 'An error has occured on the server' });
      }
    });
};

module.exports = { getCards, createCard, deleteCard };
