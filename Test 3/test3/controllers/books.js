const Books = require('../models').Books;
const Validator = require('fastest-validator');
const v = new Validator();

module.exports = {
  list(req, res) {
    return Books
      .findAll({
        include: [],
        order: [
          ['createdAt', 'DESC'],
        ],
      })
      .then((book) => res.status(200).send(book))
      .catch((error) => { res.status(400).send(error); });
  },

  getById(req, res) {
    return Books
      .findByPk(req.params.id, {
        include: [],
      })
      .then((book) => {
        if (!book) {
          return res.status(404).send({
            message: 'Book Not Found',
          });
        }
        return res.status(200).send(book);
      })
      .catch((error) => res.status(400).send(error));
  },

  add(req, res) {
    const schema = {
      title : 'string',
      author : 'string',
      publisher : 'string',
    }
    const validate = v.validate(req.body, schema);

    if(validate.length) {
      return res.status(400).send(validate);
    } else {
      return Books
        .create({
          title: req.body.title,
          author: req.body.author,
          publisher: req.body.publisher
        })
        .then((book) => res.status(201).send(book))
        .catch((error) => res.status(400).send(error));
    }
  },

  update(req, res) {
    const schema = {
      title : 'string',
      author : 'string',
      publisher : 'string',
    }
    const validate = v.validate(req.body, schema);

    return Books
      .findByPk(req.params.id)      
      .then(book => {
        if (!book) {
          return res.status(404).send({
            message: 'Book Not Found',
          });
        } else {
          if(validate.length) {
            return res.status(400).send(validate);
          } else {
            return book
              .update({
                title: req.body.title,
                author: req.body.author,
                publisher: req.body.publisher
              })
              .then(() => res.status(200).send(book))
              .catch((error) => res.status(400).send(error));
          }
        }
      })
      .catch((error) => res.status(400).send(error));
  },

  delete(req, res) {
    return Books
      .findByPk(req.params.id)
      .then(book => {
        if (!book) {
          return res.status(400).send({
            message: 'Book Not Found',
          });
        }
        return book
          .destroy()
          .then(() => res.status(204).send())
          .catch((error) => res.status(400).send(error));
      })
      .catch((error) => res.status(400).send(error));
  },
};