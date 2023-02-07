const mongoose = require("mongoose")

const Record = require("../record")

if(process.env.NODE_ENV !== "production") {
  require("dotenv").config()
}

mongoose.set('strictQuery', true)
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })

const db = mongoose.connection

db.on('error', () => {
  console.log('mongodb error!')
})

db.once('open', () => {
  console.log("mongodb connected!")
  for(let i = 0; i < 5; i++){
    Record.create({ 
      name:`Record-${i}`,
      date: `2023-01-${31-i*2}`,
      category:`house`,
      amount:`${i * 1000 + 50}`
    })
  }
  console.log("done!")
})