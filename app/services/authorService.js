const authorValidate = require('../validate/authorValidate')
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient()
exports.getAllAuthor = () => {
    return prisma.author.findMany();
}

exports.addAuthor = async (author_body) => {
    const { valid, message } = authorValidate.validate(author_body)

    if (!valid) {
        return message
    }

    
    const created = await prisma.author.create({
        data:{
            name:author_body.name,
            surname:author_body.surname,
            birthday:author_body.surname
        }
    })

    if (created === null){
        return 'Not created'
    }

    return 'Author created'
}

exports.updateAuthor = async (authorId, updatedAuthor) => {
    try {
        const updated = await prisma.author.update({
            where: {
                id: parseInt(authorId, 10)
            },
            data: {
                name: updatedAuthor.name,
                surname: updatedAuthor.surname,
                birthday: updatedAuthor.birthday
            }
        });

        if (updated) {
            return 'Author updated';
        } else {
            return 'Author not found';
        }
    } catch (error) {

        if (error.code === 'P2025') {
            return 'Author not found';
        }

        return 'Error updating author';
    }
};


exports.deleteAuthor = async (authorId) => {
    try {
        const deleted = await prisma.author.delete({
            where: {
                id: parseInt(authorId, 10)
            }
        });

        if (deleted) {
            return 'Author deleted';
        } else {
            return 'Author not found';
        }
    } catch (error) {
        console.error('Error deleting author:', error);

        if (error.code === 'P2025') {
            return 'Author not found';
        }

        return 'Error deleting author';
    }
};
