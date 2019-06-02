const usersRouter = require("express").Router()
const bcrypt = require('bcrypt')
const User = require("../models/user")

usersRouter.post("/", async (request, response, next) => {
    try {
        const body = request.body
        
        const salt = 10
        const passwordHash = await bcrypt.hash(body.password, salt)

        const user = new User({
            username: body.username,
            name: body.name,
            passwordHash
        })

        const savedUser = await user.save()
        response.json(savedUser)
    } catch (exception) {
        next(exception)
    }
})

usersRouter.get("/", async (request, response, next) => {
    try {
        const allUsers = await User.find({})
        response.json(allUsers.map(user => user.toJSON()))
    } catch (exception) {
        next(exception)
    }
})


module.exports = usersRouter