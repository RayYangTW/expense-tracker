const Record = require("../record")
const db = require("../../config/mongoose")


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