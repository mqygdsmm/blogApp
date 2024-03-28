const User = require('../models/user')
const supertest = require('supertest')
const app = require('../app')
const {test, beforeEach, describe, after} = require('node:test')
const assert = require('node:assert')
const {initialUsers, userInDb} = require('./test_helper')
const { default: mongoose } = require('mongoose')

const api = supertest(app)


describe("when added a invalid user", () => {
    beforeEach(async () => {
        await User.deleteMany({})
        const usersObject = initialUsers.map(user => new User(user))
        const PromiseArray = usersObject.map(user => user.save())
        await Promise.all(PromiseArray)

    })
    test('the invalid user will not be added', async () => {
        const usersAtFirst = await userInDb()
        const user = {
            username: 'ye',
            password: "wewewewewe",
            name: 'mqyg'
        }
        await api
            .post('/api/user')
            .send(user)
            .expect(400)

        const usersAtEnd = await userInDb() 
        assert.strictEqual(usersAtFirst.length, usersAtEnd.length)
    })
    after(() => {
        mongoose.connection.close()
    })
})

