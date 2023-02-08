const express = require("express")
const router = express.Router()

const Record = require("../../models/record")

router.get('/', (req, res) => {
  Record.find()
  .lean()
  .then(records => res.render('index', {records}))
  .catch(err => console.error(err))
  
})

router.get('*', (req, res) => {
  res.status(404)
  res.render("error")
  })

module.exports = router