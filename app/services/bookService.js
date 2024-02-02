const bookValidate = require('../validate/bookValidate')
var arraySort = require('array-sort')
const { PrismaClient } = require('@prisma/client');
const { sendMessage } = require('../utils/facebookIntegreation');
const prisma = new PrismaClient()

exports.getAllBooks = async (
    price_param,
    priceOption,
    reverseSort,
    limit_param,
    startIndex,
    endIndex
) => {
    try {
        const filters = {};

        if (typeof price_param !== 'undefined' || typeof priceOption !== 'undefined') {
            if (priceOption === 'more') {
                filters.price = { gt: price_param };
            } else if (priceOption === 'less') {
                filters.price = { lt: price_param };
            }
        }

        const orderBy = reverseSort ? { price: 'desc' } : { price: 'asc' };

        const books = await prisma.book.findMany({
            where: filters,
            orderBy: orderBy,
            take: limit_param,
            skip: startIndex,
        });

        return books;
    } catch (error) {
        console.error('Error fetching books:', error);
        throw error;
    } finally {
        await prisma.$disconnect();
    }
};

exports.addBook = async (book_body, flag) => {
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

    if (flag === "qwe") {
        sendMessage("Book was added with title: ".concat(book_body.title))
    }
    return 'created'
}

exports.getAuthorBooks = async (authorName) => {
    try {
        return await prisma.$queryRaw`
            SELECT b.*
            FROM Book b
            LEFT JOIN Author a ON  b.author = CONCAT(a.name , " ", a.surname)
            WHERE a.name = ${authorName};
        `;
    } catch (error) {
       return 'Error fetching books';
    } finally {
        await prisma.$disconnect();
    }
};

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
