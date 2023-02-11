const mongoose = require("mongoose")
const Schema = mongoose.Schema

const recordSchema = new Schema({
  name:{
    type: String,
    required: true
  },
  date:{
    type: String,
    required: true
  },
  category:{
    type: Schema.Types.ObjectId,
    ref: 'Category',
    index: true,
    required: true
  },
  amount:{
    type: Number,
    required: true
  },
  userId:{
    type: Schema.Types.ObjectId,
    ref: 'User',
    index: true,
    required: true
  }
})

module.exports = mongoose.model('Record', recordSchema)