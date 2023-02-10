const express = require("express")
const router = express.Router()

const Record = require("../../models/record")

router.get('/new', (req, res) => {
  res.render("new")
})

// Create
router.post('/', (req, res) => {
  const userId = req.user._id
  const { name, date, category, amount } = req.body
  const errors = []
  if( amount <= 0) {
    errors.push({ message: '金額必須為正數' })
  }
  if(!category) {
    errors.push({ message: '請選擇類別' })
  }
  if(errors.length){
    return res.render('new', {
      errors,
      name,
      date,
      category,
      amount
    })
  }
  Record.create({ name, date, category, amount, userId })
    .then(() => res.redirect('/'))
    .catch(err => console.error(err))
})

// Update
router.get('/:id/edit', (req, res) => {
  const _id = req.params.id
  const userId = req.user._id
  Record.findOne({ _id, userId })
    .lean()
    .then(record => res.render('edit', {record}))
    .catch(err => console.error(err))
})

router.put('/:id', (req, res) => {
  const id = req.params.id
  const { name, date, category, amount } = req.body
  const errors = []
  if(amount <= 0){
        errors.push({ message: '金額必須為正數' })
      }
  if(!category) {
    errors.push({ message: '請選擇類別' })
  }
  if(errors.length){
    return res.render('new', {
      errors,
      name,
      date,
      category,
      amount
    })
  }
  Record.findByIdAndUpdate(id, req.body)
    .then(() => res.redirect('/'))
    .catch(err => console.error(err))
})

// router.put('/:id', (req, res) => {
//   const _id = req.params.id
//   const userId = req.user._id
//   const { name, date, category, amount } = req.body
//   const errors = []
//   if(amount <= 0){
//         errors.push({ message: '金額必須為正數' })
//       }
//   if(!category) {
//     errors.push({ message: '請選擇類別' })
//   }
//   if(errors.length){
//     return res.render('new', {
//       errors,
//       name,
//       date,
//       category,
//       amount
//     })
//   }
//   Record.findOne({ _id, userId })
//     .then(record => {
//       record.name = name
//       record.dare = date
//       record.category = category
//       record.amount = amount
//       return record.save()
//     })
//     .then(() => res.redirect('/'))
//     .catch(err => console.error(err))
// })

// Delete
router.delete('/:id', (req, res) =>{
  const _id = req.params.id
  const userId = req.user._id
  Record.findOne({ _id, userId })
    .then(record => record.remove())
    .then(() => res.redirect('/'))
    .catch(err => console.error(err))
})

module.exports = router