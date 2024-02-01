const genreValidate = require('../validate/genreValidate')
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient()


exports.getAllGenre = async () => {
    return await prisma.genre.findMany();
}

exports.addGenre = async (genreBody) => {
    const { valid, message } = genreValidate.validate(genreBody)

    if (!valid) {
        return message
    }

    const created = await prisma.genre.create({data:{name : genreBody.name}})
    if (created === null){
        return 'Not created'
    }
    return 'created'
}


exports.updateGenre = async (genreId, updateGenre) => {
    try {
        const updated = await prisma.genre.update({
            where: {
                id: parseInt(genreId, 10)
            },
            data: {
                name: updateGenre.name
            }
        });

        if (updated) {
            return 'Genre updated';
        } else {
            return 'Genre not found';
        }
    } catch (error) {
        if (error.code === 'P2025') {
            return 'Genre not found';
        }

        return 'Error updating genre';
    }
};


exports.deleteGenre = async (genreId) => {
    try {
        const deleted = await prisma.genre.delete({
            where: {
                id: parseInt(genreId, 10)
            }
        });
        if (deleted) {
            return 'Genre deleted';
        } else {
            return 'Genre not found';
        }
    } catch (error) {

        if (error.code === 'P2025') {
            return 'Genre not found';
        }

        return 'Error deleting genre';
    }
};

