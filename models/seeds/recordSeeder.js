const bcrypt = require('bcryptjs')
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const Record = require("../record")
const User = require("../user")
const db = require("../../config/mongoose")

const SEED_USER = {
  email: 'zxc@zxc.zxc',
  name: 'example',
  password: 'zxc'
}

db.once('open', () => {
  console.log("mongodb connected!")
  bcrypt
    .genSalt(10)
    .then(salt => bcrypt.hash(SEED_USER.password, salt))
    .then(hash => 
      User.create({
        email: SEED_USER.email,
        name: SEED_USER.name,
        password: hash
      }))
    .then(user => {
      const userId = user._id
      return Promise.all(Array.from(
        { length: 5 },
        (_,i) => Record.create({
          userId,
          name:`Record-${i}`,
          date: `2023-01-${31-i*2}`,
          category:"63e73f0bf6c8add2a3812abd",
          amount: Math.floor(Math.random()*3000)+1
        })))
    })
    .then(() => {
      console.log("done! seed records created, seed user created.")
      process.exit()
    })
})