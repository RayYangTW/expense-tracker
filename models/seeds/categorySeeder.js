const Category = require("../category")
const User = require("../user")
const db = require("../../config/mongoose")

const categoryRawData = require("../category.json").CATEGORY

db.once('open', () => {
  Category.create(categoryRawData)
    .then(() => {
      console.log('category data is created ')
      process.exit()
    })
})

