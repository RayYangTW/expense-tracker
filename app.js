const express = require("express")
const mongoose = require("mongoose")
const { engine } = require("express-handlebars")
const bodyParser = require("body-parser")
const methodOverride = require("method-override")

if(process.env.NODE_ENV !== "production") {
  require("dotenv").config()
}

const Record = require("./models/record")
const routes = require("./routes")

const app = express()
const PORT = process.env.PORT

app.engine("hbs", engine({ defaultLayout: "main", extname: ".hbs"}))
app.set("view engine", "hbs")

app.use(bodyParser.urlencoded({ extended: true }))
app.use(methodOverride('_method'))
app.use(routes)

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

app.listen(PORT, () => {
  console.log(`App is running on http://localhost:${PORT}`)
})