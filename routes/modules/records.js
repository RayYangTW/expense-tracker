const express = require("express")
const router = express.Router()

const Record = require("../../models/record")

router.get('/new', (req, res) => {
  res.render("new")
})

router.post('/', (req, res) => {
  const { name, date, category, category2, amount } = req.body
  Record.create({ name, date, category, amount })
    .then(() => res.redirect('/'))
    .catch(err => console.error(err))
})

router.get('/:id/edit', (req, res) => {
  const id = req.params.id
  Record.findById(id)
    .lean()
    .then(record => res.render('edit', {record}))
    .catch(err => console.error(err))
})

router.put('/:id', (req, res) => {
  const id = req.params.id
  Record.findByIdAndUpdate(id, req.body)
    .then(() => res.redirect('/'))
    .catch(err => console.error(err))
})

router.delete('/:id', (req, res) =>{
  const id = req.params.id
  Record.findById(id)
    .then(record => record.remove())
    .then(() => res.redirect('/'))
    .catch(err => console.error(err))
})

router.get('/*', (req, res) => {
  res.status(404)
  res.render("error")
  })

module.exports = router