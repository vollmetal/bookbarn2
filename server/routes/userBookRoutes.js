const express = require('express');
const userBookRouter = express.Router();
const jwt = require('jsonwebtoken');

userBookRouter.post('/cart', async (req, res) => {
    const user = req.body
    console.log(user)
    if(user.id) {
        // user is authenticated 
        // continue with the original request 
        const bookIds = await models.UserCart.findAll({
            where : {
                userId: user.id
    
            }
        })
        let books = []

        for (let index = 0; index < bookIds.length; index++) {
            const element = bookIds[index];
            books.push(await models.Books.findOne({
                    where: {
                        id: element.bookId
                    }
                }))
        }
    console.log(books)
    
    res.json(books)
    } else {
        res.json({success: false, message: 'failed to grab books'})
    }
})

userBookRouter.post('/cart/new', async (req, res) => {
    const user = req.body.user
    console.log(user)
    const bookId = req.body.bookId

    if(user.id && bookId)
    {const newCartItem = await models.UserCart.build({
        userId: user.id,
        bookId: bookId
    })
    const books = await newCartItem.save()
    res.json({success: true, message: `Success!`})
    } else {
        res.json({success: false, message: 'failed to add book to cart'})
    }
})

userBookRouter.post('/cart/get', async (req, res) => {
    const user = req.body
    console.log(user)
    if (user.id) {
        const userCartBooks = await models.UserCart.findAll({
        where : {
            userId: user.id

        }
    })
    console.log(userCartBooks)
    res.json(userCartBooks)
        } else {
            res.json({success: false, message: 'failed to grab books'})
        }
})

userBookRouter.post('/cart/delete', async (req, res) => {
    const user = req.body.user
    const bookId = req.body.bookId

    const newCartItem = await models.UserCart.destroy({
        where: {
            userId: user.id,
            bookId: bookId
        }
        
    })
    const books = await newCartItem.save()
    res.json({success: true, message: `Success!`})
})


module.exports = userBookRouter;