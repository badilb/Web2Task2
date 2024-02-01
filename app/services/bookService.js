const bookValidate = require('../validate/bookValidate')
var arraySort = require('array-sort')
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient()

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

exports.addBook = async (book_body) => {
    const { valid, message } = bookValidate.validate(book_body)

    if (!valid) {
        return message
    }

    const created = await prisma.book.create(
        {
            data: {
                title:book_body.title,
                author:book_body.author,
                publishYear:book_body.publishYear,
                pageCount:book_body.pageCount,
                price:book_body.price
            }
        }
    )


    if (created === null){
        return 'Not created'
    }
    return 'created'
}

exports.updateBook = async (bookId, updatedBook) => {
    try {
        const updated = await prisma.book.update({
            where: {
                id: parseInt(bookId, 10)
            },
            data: {
                title:updatedBook.title,
                author:updatedBook.author,
                publishYear:updatedBook.publishYear,
                pageCount:updatedBook.pageCount,
                price:updatedBook.price
            }
        });

        if (updated) {
            return 'Book updated';
        } else {
            return 'Book not found';
        }
    } catch (error) {
        if (error.code === 'P2025') {
            return 'Book not found';
        }

        return 'Error updating book';
    }
}

exports.deleteBook = async (bookId) => {
    try {
        const updated = await prisma.book.delete({
            where: {
                id: parseInt(bookId, 10)
            }})
        if (updated) {
            return 'Book deleted';
        } else {
            return 'Book not found';
        }
    } catch (error) {
        if (error.code === 'P2025') {
            return 'Book not found';
        }

        return 'Error deleting book';
    }
}
