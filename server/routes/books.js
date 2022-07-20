const express = require('express');
const bookRouter = express.Router();



bookRouter.get('/', async (req, res) => {
    let books = ''
    if(req.body.id) {
        books = await models.Books.findAll({
            where : {
                ownerId: req.body.id
    
            }
        })
    } else {
        books = await models.Books.findAll({
            where : {
    
            }
        })
    }
    
    res.json(books)
})

bookRouter.post('/new', async (req, res) => {
    const newBook = await models.Books.build({
        title: req.body.title,
        genre: req.body.genre,
        publisher: req.body.publisher,
        author: req.body.author,
        imageURL: req.body.imageURL,
        year: req.body.year,
        ownerId: req.body.userID
    })
    const books = await newBook.save()
    res.json('Success!')
    
})

bookRouter.post('/update', async (req, res) => {
    const updateBook = await models.Books
})

bookRouter.delete('/delete', async (req, res) => {
    const deletedBook = await models.Books.destroy({
        where: {
          id: req.body.id,
        },
      });
})


module.exports = bookRouter;