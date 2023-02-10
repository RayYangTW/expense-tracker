const express = require("express")
const router = express.Router()

const Record = require("../../models/record")

router.get('/new', (req, res) => {
  res.render("new")
})

router.post('/', (req, res) => {
  const userId = req.user._id
  const { name, date, category, amount } = req.body
  Record.create({ name, date, category, amount, userId })
    .then(() => res.redirect('/'))
    .catch(err => console.error(err))
})

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
  console.log(id)
  Record.findByIdAndUpdate(id, req.body)
    .then(() => res.redirect('/'))
    .catch(err => console.error(err))
})

// router.put('/:id', (req, res) => {
//   const _id = req.params.id
//   const userId = req.user._id
//   const { name, date, category, amount } = req.body
//   console.log(_id)
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

router.delete('/:id', (req, res) =>{
  const _id = req.params.id
  const userId = req.user._id
  Record.findOne({ _id, userId })
    .then(record => record.remove())
    .then(() => res.redirect('/'))
    .catch(err => console.error(err))
})

module.exports = router