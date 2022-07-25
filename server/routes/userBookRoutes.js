const express = require('express');
const userBookRouter = express.Router();
const jwt = require('jsonwebtoken');

userBookRouter.get('/cart', async (req, res) => {
    const headers = req.headers['authorization']
    console.log(headers)
    if(headers) {
        console.log('header found!')
        const userToken = headers.split(' ')[1]
        jwt.verify(userToken, 'LINUSTORVALDS', function (err, decoded) {

            if(err) {
                res.json({success: false, message: 'Unable to authenticate!'})
            } else {
                console.log('token authenticated!')
                const userId = decoded.id 
                models.Users.findOne({
                    where: {
                        id: userId
                    }
                }).then(async user => {
                    if(user) {
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
                        res.json({success: false, message: 'Unable to authenticate!'})
                    }
                })
            }

        })
    }


    const userId = 0
    
})

userBookRouter.post('/cart/new', async (req, res) => {
    const userId = req.body.user
    console.log(userId)
    const bookId = req.body.bookId

    const newCartItem = await models.UserCart.build({
        userId: userId,
        bookId: bookId
    })
    const books = await newCartItem.save()
    res.json({success: true, message: `Success!`})
})

userBookRouter.post('/cart/delete', async (req, res) => {
    const userId = req.body.userId
    const bookId = req.body.bookId

    const newCartItem = await models.UserCart.build({
        userId: userId,
        bookId: bookId
    })
    const books = await newCartItem.save()
    res.json({success: true, message: `Success!`})
})


module.exports = userBookRouter;