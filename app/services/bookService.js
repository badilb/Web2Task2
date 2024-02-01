const bookValidate = require('../validate/bookValidate')
var arraySort = require('array-sort')
let books = []
let ID = 0

exports.getAllBooks = (
    price_param,
    priceOption,
    reverseSort,
    limit_param,
    startIndex,
    endIndex
) => {
    let filtered_books = books

    if (
        typeof price_param !== 'undefined' ||
        typeof priceOption !== 'undefined'
    ) {
        if (priceOption === 'more') {
            filtered_books = filtered_books.filter(
                (author) => author.price > price_param
            )
        } else if (priceOption === 'less') {
            filtered_books = filtered_books.filter(
                (author) => author.price < price_param
            )
        }
    }

    if (typeof reverseSort !== 'undefined') {
        arraySort(filtered_books, 'price', { reverse: true })
    } else {
        arraySort(filtered_books, 'price', { reverse: false })
    }

    filtered_books = filtered_books.slice(startIndex, endIndex)

    return filtered_books
}

exports.addBook = (book_body) => {
    const { valid, message } = bookValidate.validate(book_body)

    if (!valid) {
        return message
    }

    book_body.id = ID++
    books.push(book_body)
    return message
}

exports.updateBook = (bookId, updatedBook) => {
    let bookIndex = books.findIndex((book) => book.id === parseInt(bookId))
    if (bookIndex !== -1) {
        books[bookIndex] = { ...books[bookIndex], ...updatedBook }
        return 'The book is updated'
    }
    return 'The book does not exist'
}

exports.deleteBook = (bookId) => {
    const index = books.findIndex((book) => book.id === parseInt(bookId))
    if (index !== -1) {
        books.splice(index, 1)
        return 'Book deleted'
    }
    return 'Book not found'
}
