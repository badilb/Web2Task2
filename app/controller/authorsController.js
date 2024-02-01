const authorService = require('../services/authorService')
const HttpStatus = require('http-status')

exports.getAllAuthor = async (req, res) => {
    try {

        const authors = await authorService.getAllAuthor()

        res.status(HttpStatus.OK).json(authors)
    } catch (error) {
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
            message: error.message,
        })
    }
}

exports.addAuthor = async (req, res) => {
    try {
        const author = req.body
        const message = await authorService.addAuthor(author)

        res.status(HttpStatus.OK).json(message)
    } catch (error) {
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
            message: error.message,
        })
    }
}

exports.updateAuthor = async (req, res) => {
    try {
        const authorId = req.params.id
        const author = req.body
        const message = await authorService.updateAuthor(authorId, author)
        res.status(HttpStatus.OK).json(message)
    } catch (error) {
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
            message: error.message,
        })
    }
}

exports.deleteAuthor = async (req, res) => {
    try {
        const authorId = req.params.id
        const message = await authorService.deleteAuthor(authorId)

        res.status(HttpStatus.OK).json(message)
    } catch (error) {
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
            message: error.message,
        })
    }
}
