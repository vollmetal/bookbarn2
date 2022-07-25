const express = require('express');
const userRouter = express.Router();
const jwt = require('jsonwebtoken');

const SALT_ROUNDS = 10;

userRouter.post('/registration', async (req, res) => {
    const databaseUser = await models.Users.findOne({
        where: {
            username: req.body.username,
          },
    })
    if (databaseUser == null) {
        bcrypt.hash(req.body.password, SALT_ROUNDS, async (error, hash) => {
            if(error) {
                res.json({success: false, message: `Error ${error}, user not registered!`})
            }
            else {
                const newUser = models.Users.build({
                    username: req.body.username,
                    password: hash,
                    email: req.body.email
                })
                const savedUser = newUser.save()
                res.json({success: true, message: `Success!`})
            }
        })
    }
})

userRouter.post('/login', async (req, res) => {
    const retrievedUser = await models.Users.findOne({
            where: {
                email: req.body.email
            }
        })
        if(retrievedUser != null) {
            bcrypt.compare(req.body.password, retrievedUser.password, (error, result) => {
                if(result) {
                    const token = jwt.sign({id: retrievedUser.id}, 'LINUSTORVALDS')
                    res.json({success: true, username: retrievedUser.username, token: token})
                } else {
                    res.json({success: false, message: error})
                }
            })
        } else {
            res.json({success: false, message: 'User does not exist'})
        }
})

module.exports = userRouter;