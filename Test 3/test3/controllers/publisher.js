const Book = require('../models').Book;
const Publisher = require('../models').Publisher;
const Validator = require('fastest-validator');
const v = new Validator();

module.exports = {
  list(req, res) {
    return Publisher
      .findAll({
        include: [],
        order: [
          ['createdAt', 'DESC'],
        ],
      })
      .then((publisher) => res.status(200).send(publisher))
      .catch((error) => { res.status(400).send(error); });
  },

  getById(req, res) {
    return Publisher
      .findByPk(req.params.id, {
        include: [{
          model: Book,
          as: 'book'
        }],
      })
      .then((publisher) => {
        if (!publisher) {
          return res.status(404).send({
            message: 'Publisher Not Found',
          });
        }
        return res.status(200).send(publisher);
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
      return Publisher
        .create({
          name: req.body.name,
        })
        .then((publisher) => res.status(201).send(publisher))
        .catch((error) => res.status(400).send(error));
    }
  },

  update(req, res) {
    const schema = {
      name : 'string'
    }
    const validate = v.validate(req.body, schema);

    return Publisher
      .findByPk(req.params.id)      
      .then(publisher => {
        if (!publisher) {
          return res.status(404).send({
            message: 'Publisher Not Found',
          });
        } else {
          if(validate.length) {
            return res.status(400).send(validate);
          } else {
            return publisher
              .update({
                name: req.body.name || user.name,
              })
              .then(() => res.status(200).send(publisher))
              .catch((error) => res.status(400).send(error));
          }
        }
      })
      .catch((error) => res.status(400).send(error));
  },

  delete(req, res) {
    return Publisher
      .findByPk(req.params.id)
      .then(publisher => {
        if (!publisher) {
          return res.status(400).send({
            message: 'Publisher Not Found',
          });
        }
        return publisher
          .destroy()
          .then(() => res.status(204).send())
          .catch((error) => res.status(400).send(error));
      })
      .catch((error) => res.status(400).send(error));
  },
};