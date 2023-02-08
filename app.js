const express = require("express")
const session = require("express-session")
const { engine } = require("express-handlebars")
const bodyParser = require("body-parser")
const methodOverride = require("method-override")

if(process.env.NODE_ENV !== "production") {
  require("dotenv").config()
}

const routes = require("./routes")
const usePassport = require('./config/passport')

require('./config/mongoose')

const app = express()
const PORT = process.env.PORT

app.engine("hbs", engine({ defaultLayout: "main", extname: ".hbs"}))
app.set("view engine", "hbs")

app.use(session({
  secret:"Secret",
  resave: false,
  saveUninitialized: true
}))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(methodOverride('_method'))
usePassport(app)
app.use(routes)

app.listen(PORT, () => {
  console.log(`App is running on http://localhost:${PORT}`)
})