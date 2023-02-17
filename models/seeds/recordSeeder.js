const bcrypt = require('bcryptjs')
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const Record = require("../record")
const User = require("../user")
const Category = require("../category")
const db = require("../../config/mongoose")
const category = require('../category')

const SEED_USER = {
  name: "User",
  email: "user@example.com",
  password: "12345678"
}

db.once('open', () => {
  console.log("mongodb connected!")
  Category.find()
    .lean()
    .then((categoryData) => {
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
            (_,i) => 
            Record.create({
              userId,
              name:`Record-${i}`,
              date: `2023-02-${31-i*2}`,
              category: categoryData[i]._id,
              amount: Math.floor(Math.random()*3000)+1
            })))
        })
        .then(() => {
          console.log("done! seed records created, seed user created.")
          process.exit()
        })
    })

  
})