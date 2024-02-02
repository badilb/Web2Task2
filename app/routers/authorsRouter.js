const express = require('express')
const router = express.Router()
const authorController = require('../controller/authorsController')

router.get('/', authorController.getAllAuthor)
router.post('/add', authorController.addAuthor)
router.put('/:id/update', authorController.updateAuthor)
router.delete('/:id/delete', authorController.deleteAuthor)
router.get('/books', authorController.getAuthorBooks)

module.exports = router
