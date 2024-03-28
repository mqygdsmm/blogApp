const User = require('../models/user')
const bcrypt = require('bcrypt')
const UserRouter = require('express').Router()


UserRouter.post('/', async (request, response) => {
    const {username, name, password} = request.body
    if (!password || password.length < 3) {
        return response.status(400).json({error: 'invalid password'})
    }
    const user = new User({
        username,
        name,
        passwordHash: await bcrypt.hash(password, 10),
        blogs: []
    })

    const savedUser = await user.save()
    response.status(201).json(savedUser)
})

UserRouter.get('/', async (request, response) => {
    const users = await User.find({}).populate('blogs', {url:1, tile:1, author:1, id: 1})
    response.json(users)
})

module.exports = UserRouter
