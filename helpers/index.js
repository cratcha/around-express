const fsPromises = require('fs').promises;

const readFile = (path, res) => fsPromises
  .readFile(path, { encoding: 'utf8' })
  .then(JSON.parse)
  .catch(() => res.status(500).send({ message: 'An error has occured on the server' }));

module.exports = readFile;
