const express = require("express")
const router = express.Router()

const Record = require("../../models/record")
const Category = require("../../models/category")
const category = require("../../models/category")

router.get('/new', (req, res) => {
  Category.find()
    .lean()
    .sort({ _id: 'asc' })
    .then(categoryData => 
      res.render("new", {categoryData}))
    .catch(err => console.error(err))
})

//  =========  Create  =========  

router.post('/', (req, res) => {
  const userId = req.user._id
  const { name, date, category, amount } = req.body
  const errors = []
  if( amount <= 0) {
    errors.push({ message: '金額必須為正數' })
  }
  if( amount > 99999999) {
    errors.push({ message: '金額過大，必須小於1億' })
  }
  if(!category) {
    errors.push({ message: '請選擇類別' })
  }
  if(errors.length){
    Category.find()
      .lean()
      .sort({ _id: 'asc'})
      .then( categoryData => 
        res.render('new', {
          errors,
          name,
          date,
          category,
          amount,
          categoryData
    }))
  } else {
    Record.create({ name, date, category, amount, userId })
    .then(() => res.redirect('/'))
    .catch(err => console.error(err))
  }
})

// =========  Update  =========  

router.get('/:id/edit', (req, res) => {
  const _id = req.params.id
  const userId = req.user._id
  Category.find()
    .lean()
    .sort({ _id: 'asc' })
    .then(categoryData => {
      Record.findOne({ _id, userId })
        .lean()
        .then( (record) => { 
          categoryData.forEach((item) => {
            if (item._id.toString() === record.category.toString()) {
              item.selected = true
            }
          })
          res.render('edit', {categoryData, record})})
        .catch(err => console.log(err))
    })
    .catch(err => console.log(err))
})


router.put('/:id', (req, res) => {
  const userId = req.user._id
  const _id = req.params.id
  const { name, date, category, amount } = req.body
  const errors = []
  
  if(amount <= 0){
    errors.push({ message: '金額必須為正數' })
  }
  if( amount > 99999999) {
    errors.push({ message: '金額太大啦！必須小於1億' })
  }
  if(!category) {
    errors.push({ message: '請選擇類別' })
  }
  if(errors.length) {
    Category.find()
    .lean()
    .sort({ _id: 'asc' })
    .then(categoryData => {
      Record.findOne({ _id, userId })
        .lean()
        .then( (record) => { 
          categoryData.forEach((item) => {
            if (item._id.toString() === record.category.toString()) {
              item.selected = true
            }
          })
          res.render('edit', {errors, categoryData, record})})
        .catch(err => console.log(err))
    })
    .catch(err => console.log(err))
    
      
  } else {
    return Record.findByIdAndUpdate(_id, req.body)
    .then(() => res.redirect('/'))
    .catch(err => console.error(err))
  }  
})

//  =========  Delete  =========  

router.delete('/:id', (req, res) =>{
  const _id = req.params.id
  const userId = req.user._id
  Record.findOne({ _id, userId })
    .then(record => record.remove())
    .then(() => res.redirect('/'))
    .catch(err => console.error(err))
})

module.exports = router