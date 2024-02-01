const bookService = require('../services/bookService')
const HttpStatus = require('http-status')

exports.getAllBooks = async (req, res) => {
    try {
        const price_param = req.query.price
        const reverseSort = req.query.reverseSort
        const priceOption = req.query.priceOption
        const limit_param = req.query.limit
        const page_param = parseInt(req.query.page) || 1

        const startIndex = 0
        const endIndex = page_param * limit_param

        const books = bookService.getAllBooks(
            price_param,
            priceOption,
            reverseSort,
            limit_param,
            startIndex,
            endIndex
        )

        const response = {
            totalBooks: books.length,
            books: books.slice(startIndex, endIndex),
            currentPage: page_param,
            totalPages: Math.ceil(books.length / limit_param),
        }

        res.status(HttpStatus.OK).json(response)
    } catch (error) {
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
            message: error.message,
        })
    }
}

exports.addBook = async (req, res) => {
    try {
        const book = req.body
        const message = bookService.addBook(book)

        res.status(HttpStatus.OK).json(message)
    } catch (error) {
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
            message: error.message,
        })
    }
}

exports.updateBook = async (req, res) => {
    try {
        const bookId = req.params.id
        const updateBook = req.body

        const message = bookService.updateBook(bookId, updateBook)

        res.status(HttpStatus.OK).json(message)
    } catch (error) {
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
            message: error.message,
        })
    }
}

exports.deleteBook = async (req, res) => {
    try {
        const bookId = req.params.id

        const message = bookService.deleteBook(bookId)

        res.status(HttpStatus.OK).json(message)
    } catch (error) {
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
            message: error.message,
        })
    }
}
