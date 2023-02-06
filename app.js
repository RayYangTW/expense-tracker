const express = require("express")
const mongoose = require("mongoose")
const { engine } = require("express-handlebars")

if(process.env.NODE_ENV !== "production") {
  require("dotenv").config()
}

const Record = require("./models/record")
const record = require("./models/record")

const app = express()
const PORT = process.env.PORT

app.engine("hbs", engine({ defaultLayout: "main", extname: ".hbs"}))
app.set("view engine", "hbs")

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

app.listen(PORT, () => {
  console.log(`App is running on http://localhost:${PORT}`)
})