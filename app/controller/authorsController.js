const authorService = require('../services/authorService')
const HttpStatus = require('http-status')

exports.getAllAuthor = async (req, res) => {
    try {
        const name_param = req.query.name
        const limit_param = req.query.limit || 10
        const page_param = parseInt(req.query.page) || 1

        const startIndex = 0
        const endIndex = page_param * limit_param

        const authors = authorService.getAllAuthor(
            name_param,
            limit_param,
            startIndex,
            endIndex
        )

        const response = {
            totalAuthors: authors.length,
            authors: authors.slice(startIndex, endIndex),
            currentPage: page_param,
            totalPages: Math.ceil(authors.length / limit_param),
        }

        res.status(HttpStatus.OK).json(response)
    } catch (error) {
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
            message: error.message,
        })
    }
}

exports.addAuthor = async (req, res) => {
    try {
        const author = req.body
        const message = authorService.addAuthor(author)

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
        const message = authorService.updateAuthor(authorId, author)
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
        const message = authorService.deleteAuthor(authorId)

        res.status(HttpStatus.OK).json(message)
    } catch (error) {
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
            message: error.message,
        })
    }
}
