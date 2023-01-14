const Book = require('../models').Book;
const Author = require('../models').Author;
const Validator = require('fastest-validator');
const v = new Validator();

module.exports = {
  list(req, res) {
    return Author
      .findAll({
        include: [],
        order: [
          ['createdAt', 'DESC'],
        ],
      })
      .then((author) => res.status(200).send(author))
      .catch((error) => { res.status(400).send(error); });
  },

  getById(req, res) {
    return Author
      .findByPk(req.params.id, {
        include: [{
          model: Book,
          as: 'book'
        }],
      })
      .then((author) => {
        if (!author) {
          return res.status(404).send({
            message: 'Author Not Found',
          });
        }
        return res.status(200).send(author);
      })
      .catch((error) => res.status(400).send(error));
  },

  add(req, res) {
    const schema = {
      name : 'string'
    }
    const validate = v.validate(req.body, schema);

    if(validate.length) {
      return res.status(400).send(validate);
    } else {
      return Author
        .create({
          name: req.body.name,
        })
        .then((author) => res.status(201).send(author))
        .catch((error) => res.status(400).send(error));
    }
  },

  update(req, res) {
    const schema = {
      name : 'string'
    }
    const validate = v.validate(req.body, schema);

    return Author
      .findByPk(req.params.id)      
      .then(author => {
        if (!author) {
          return res.status(404).send({
            message: 'Author Not Found',
          });
        } else {
          if(validate.length) {
            return res.status(400).send(validate);
          } else {
            return author
              .update({
                name: req.body.name,
              })
              .then(() => res.status(200).send(author))
              .catch((error) => res.status(400).send(error));
          }
        }
      })
      .catch((error) => res.status(400).send(error));
  },

  delete(req, res) {
    return Author
      .findByPk(req.params.id)
      .then(author => {
        if (!author) {
          return res.status(400).send({
            message: 'Author Not Found',
          });
        }
        return author
          .destroy()
          .then(() => res.status(204).send())
          .catch((error) => res.status(400).send(error));
      })
      .catch((error) => res.status(400).send(error));
  },
};