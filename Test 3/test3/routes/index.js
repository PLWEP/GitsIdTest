var express = require('express');
var router = express.Router();

const bookController = require('../controllers').book;
const authorController = require('../controllers').author;
const publisherController = require('../controllers').publisher;

/* book Router */
router.get('/api/book', bookController.list);
router.get('/api/book/:id', bookController.getById);
router.post('/api/book', bookController.add);
router.put('/api/book/:id', bookController.update);
router.delete('/api/book/:id', bookController.delete);

/* author Router */
router.get('/api/author', authorController.list);
router.get('/api/author/:id', authorController.getById);
router.post('/api/author', authorController.add);
router.put('/api/author/:id', authorController.update);
router.delete('/api/author/:id', authorController.delete);

/* publisher Router */
router.get('/api/publisher', publisherController.list);
router.get('/api/publisher/:id', publisherController.getById);
router.post('/api/publisher', publisherController.add);
router.put('/api/publisher/:id', publisherController.update);
router.delete('/api/publisher/:id', publisherController.delete);


module.exports = router; 