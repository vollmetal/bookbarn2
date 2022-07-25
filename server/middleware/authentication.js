const jwt = require('jsonwebtoken')
const models = require('../models')

function authenticate(req, res, next) {

    const headers = req.headers['authorization']
    if (headers) {
        const token = headers.split(' ')[1]
        jwt.verify(token, 'SECRETKEY', function (err, decoded) {

            if(err) {
                res.json({success: false, message: 'Unable to authenticate!'})
            } else {
                const userId = decoded.id 
                models.Users.findOne({
                    where: {
                        id: userId
                    }
                }).then(user => {
                    if(user) {
                        // user is authenticated 
                        // continue with the original request
                        req.bpdy.user = user.id
                        next() 
                    } else {
                        res.json({success: false, message: 'Unable to authenticate!'})
                    }
                })
            }

        })

    } else {
        res.json({success: false, message: 'Unable to authenticate!'})
    }


}

module.exports = authenticate 