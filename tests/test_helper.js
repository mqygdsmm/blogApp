const User = require('../models/user')
const initialBlogs = [
    {
        title: "test",
        author: "yeweilun",
        url: "www.yeweilun.com",
        likes: 10,
    },
    {
        title: "test2",
        author: "yeweilun2",
        url: "www.yeweilun.com",
        likes: 20,
    },
    {
        title: "test3",
        author: "yeweilun3",
        url: "www.yeweilun.com",
        likes: 100,
    },
    {
        title: "test3",
        author: "yeweilun3",
        url: "www.yeweilun.com",
        likes: 100,
    },
    {
        title: "test3",
        author: "yeweilun3",
        url: "www.yeweilun.com",
        likes: 100,
    }
]

const initialUsers = [
    {
        username: "yeweilun",
        name: "mqyg",
        password: "546976125qq"
    },
    {
        username: "yeweilun1",
        name: "mqyg",
        password: "546976125qq"
    },
    {
        username: "yeweilun2",
        name: "mqyg",
        password: "546976125qq"
    },
    {
        username: "yeweilun3",
        name: "mqyg",
        password: "546976125qq"
    },
]

const userInDb = async () => {
    const users = await User.find({})
    return users.map(user => user.toJSON())
}

module.exports = {
    initialBlogs, initialUsers, userInDb
}