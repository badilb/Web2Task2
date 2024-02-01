const authorValidate = require('../validate/authorValidate')
let authors = []
let ID = 0

exports.getAllAuthor = (name_param, limit_param, startIndex, endIndex) => {
    let filtered_authors = authors

    if (typeof name_param !== 'undefined') {
        filtered_authors = filtered_authors.filter(
            (author) => author.name === name_param
        )
    }

    return filtered_authors.slice(startIndex, endIndex)
}

exports.addAuthor = (author_body) => {
    const { valid, message } = authorValidate.validate(author_body)

    if (!valid) {
        return message
    }

    author_body.id = ID++
    authors.push(author_body)
    return message
}

exports.updateAuthor = (authorId, updatedAuthor) => {
    let authorIndex = authors.findIndex(
        (author) => author.id === parseInt(authorId)
    )
    if (authorIndex !== -1) {
        authors[authorIndex] = { ...authors[authorIndex], ...updatedAuthor }
        return 'The user is updated'
    }
    return 'The user does not exist'
}

exports.deleteAuthor = (authorId) => {
    const index = authors.findIndex(
        (author) => author.id === parseInt(authorId)
    )
    if (index !== -1) {
        authors.splice(index, 1)
        return 'Author deleted'
    }
    return 'Author not found'
}
