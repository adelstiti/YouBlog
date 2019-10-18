const mongoose = require("mongoose");
const Post = require('./database/models/Post') 

mongoose.connect("mongodb://localhost/testblog",{ useNewUrlParser: true,useUnifiedTopology: true } )



// Post.create({
//     title : 'Second Article',
//     description : 'Second Blog Dsescription',
//     content : 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellat.'
// }, (error,post) => {
//     console.log(error,post)
// })


// Post.find({title:'First Article'},(error,posts) => {
//     console.log(error,posts)
// })

// Post.findById('5d9e47022d6d0b39b06aec97',(error,post) => console.log(error,post))


// Post.findByIdAndUpdate('5d9e4549640ef631b822a47c',{
//     title: 'First Article is Bulshit'
// }, (error,post) => {
//       console.log(error,post)
//   })