const express = require('express');
const ejs = require('ejs');
const path = require('path')

const app = express();

//template engine
app.set("view engine", "ejs")

app.use(express.static('public'));

// app.get('/', (req, res) => {
//   const blog = {
//     id: 1,
//     title: 'Blog title',
//     description: 'Blog description',
//   };
//   res.send(blog);
// });

//Routes
app.get('/',(req, res) =>{
    // res.sendFile(path.resolve(__dirname, 'view/index.ejs'))
    res.render('index')
})
app.get('/about',(req, res) =>{
    res.render('about')
})
app.get('/add_post',(req, res) =>{
    res.render('add_post')
})


const port = 3000;
app.listen(port, () => {
  console.log(`Sunucu ${port} portunda başlatıldı..`);
});
