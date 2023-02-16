const express = require("express")
const router = express.Router()

const Record = require("../../models/record")
const Category =require("../../models/category")

router.get('/', (req, res) => {
  const userId = req.user._id
  Category.find()
    .lean()
    .sort({ _id: 'asc' })
    .then(categoryData => {
      Record.find({ userId })
        .lean()
        .sort({ date: 'desc' })
        .populate("category")
        .then( records => {
          let totalAmount = 0
          records.forEach(item => totalAmount += item.amount)
          return res.render('index', {categoryData, records, totalAmount})
        })
        .catch(err => console.log(err))
    })
    .catch(err => console.log(err))
})

router.get('/search', (req, res) => {
  const categoryId = req.query.category
  const userId = req.user._id
  if (categoryId!=="") {
    Category.find()
      .lean()
      .sort({ _id: 'asc' })
      .then( categoryData => {
        Record.find({userId, category: categoryId })
          .lean()
          .populate("category")
          .sort({ date: 'desc'})
          .then( records => {
            let totalAmount = 0
            records.forEach(item => totalAmount += item.amount)
            return res.render('index', {categoryData, records, totalAmount})
          })
          .catch(err => console.log(err))
      })
      .catch(err => console.log(err))
  } else {
    Category.find()
    .lean()
    .sort({ _id: 'asc' })
    .then(categoryData => {
      Record.find({ userId })
        .lean()
        .sort({ date: 'desc' })
        .populate("category")
        .then( records => {
          let totalAmount = 0
          records.forEach(item => totalAmount += item.amount)
          return res.render('index', {categoryData, records, totalAmount})
        })
        .catch(err => console.log(err))
    })
    .catch(err => console.log(err))
  }
  
})

router.get('*', (req, res) => {
  res.status(404)
  res.render("error")
  })

module.exports = router