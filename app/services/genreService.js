const genreValidate = require('../validate/genreValidate')
let genres = []
let ID = 0

exports.getAllGenre = () => {
    return genres
}

exports.addGenre = (genreBody) => {
    const { valid, message } = genreValidate.validate(genreBody)

    if (!valid) {
        return message
    }

    genreBody.id = ID++
    genres.push(genreBody)
    return message
}

exports.updateGenre = (genreId, updateGenre) => {
    let genreIndex = genres.findIndex((genre) => genre.id === parseInt(genreId))
    if (genreIndex !== -1) {
        genres[genreIndex] = { ...genres[genreIndex], ...updateGenre }
        return 'The genre is updated'
    }
    return 'The genre does not exist'
}

exports.deleteGenre = (genreId) => {
    const index = genres.findIndex((genre) => genre.id === parseInt(genreId))
    if (index !== -1) {
        genres.splice(index, 1)
        return 'Genre deleted'
    }
    return 'Genre not found'
}
