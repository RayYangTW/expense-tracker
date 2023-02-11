const express = require("express")
const router = express.Router()

const Record = require("../../models/record")
const Category =require("../../models/category")

// router.get('/', (req, res) => {
//   let totalAmount = 0
//   const userId = req.user._id
//   Record.find({ userId })
//     .lean()
//     .sort({ date: 'desc' })
//     .then(records => {
//       records.forEach(item => {
//         totalAmount += item.amount
//       })
//       return res.render('index', {records, totalAmount: totalAmount})})
//     .catch(err => console.error(err))
  
// })

router.get('/', (req, res) => {
  const _id = req.params.id
  const userId = req.user._id
  Category.find()
    .lean()
    .sort({ _id: 'asc' })
    .then(categoryData => {
      Record.find({ userId })
        .lean()
        .sort({ date: 'desc' })
        .then( records => {
          let totalAmount = 0
          records.forEach(item => totalAmount += item.amount)
          return res.render('index', {categoryData, records, totalAmount: totalAmount})
        })
        .catch(err => console.log(err))
    })
    .catch(err => console.log(err))
})

router.get('*', (req, res) => {
  res.status(404)
  res.render("error")
  })

module.exports = router