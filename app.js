const express = require("express")
const mongoose = require("mongoose")
const { engine } = require("express-handlebars")
const bodyParser = require("body-parser")
const methodOverride = require("method-override")

if(process.env.NODE_ENV !== "production") {
  require("dotenv").config()
}

const Record = require("./models/record")
const record = require("./models/record")

const app = express()
const PORT = process.env.PORT

app.engine("hbs", engine({ defaultLayout: "main", extname: ".hbs"}))
app.set("view engine", "hbs")

app.use(bodyParser.urlencoded({ extended: true }))
app.use(methodOverride('_method'))

// ========= mongoose =========

mongoose.set('strictQuery', true)
// 也可以這樣寫
// mongoose.connect(process.env.MONGODB_URI, () => {
//   console.log("Connected to MongoDB");
// })
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })

const db = mongoose.connection

db.on('error', () => {
  console.log('mongodb error!')
})

db.once('open', () => {
  console.log('monogodb connected!')
})

// ========= router =========

app.get('/', (req, res) => {
  Record.find()
  .lean()
  .then(records => res.render('index', {records}))
  .catch(err => console.error(err))
  
})

app.get('/records/new', (req, res) => {
  res.render("new")
})

app.post('/records', (req, res) => {
  const { name, date, category, category2, amount } = req.body
  Record.create({ name, date, category, amount })
    .then(() => res.redirect('/'))
    .catch(err => console.error(err))
})

app.get('/records/:id/edit', (req, res) => {
  const id = req.params.id
  Record.findById(id)
    .lean()
    .then(record => res.render('edit', {record}))
    .catch(err => console.error(err))
})

app.put('/records/:id', (req, res) => {
  const id = req.params.id
  const { name } = req.body
  Record.findById(id)
    .then(record => {
      record.name = name
      return record.save()
    })
    .then(() => res.redirect('/'))
    .catch(err => console.error(err))
})

app.delete('/records/:id', (req, res) =>{
  const id = req.params.id
  Record.findById(id)
    .then(record => record.remove())
    .then(() => res.redirect('/'))
    .catch(err => console.error(err))
})

app.listen(PORT, () => {
  console.log(`App is running on http://localhost:${PORT}`)
})