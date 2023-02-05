const express = require("express")

require("dotenv").config()

const app = express()
const PORT = process.env.PORT

app.get('/', (req, res) => {
  res.send('hello')
})

app.listen(PORT, () => {
  console.log(`App is running on http://localhost:${PORT}`)
})