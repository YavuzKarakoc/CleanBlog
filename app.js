const express = require('express');
const mongoose = require('mongoose');
const fileUpload = require('express-fileupload');
const methodOverride = require('method-override');
const fs = require('fs');
const ejs = require('ejs');
const postControllers = require('./controllers/postControllers')
const pageControllers = require('./controllers/pageControllers')

const app = express();

// Connect DB
mongoose
    .connect('mongodb://localhost/cleanblog-test-db', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        // useFİndAndModify:false,
        // useCreateIndex:true,
    })
    .then(() => {
        console.log('DB Connected Successfuly');
    });

//template engine
app.set('view engine', 'ejs');

// MIDDLEWARES
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(fileUpload());
app.use(methodOverride('_method', {
    methods:['POST', 'GET']
}));

// app.get('/', (req, res) => {
//   const blog = {id: 1, title: 'Blog title', description: 'Blog description',};
//   res.send(blog);
// });

//ROUTES

// ana sayfa bütün postlarımızı gösteriyoruz
app.get('/', postControllers.getAllPost);

// yeni post oluşturma,  foto için klasör yoksa oluşturma var ise o klasöre kaydetme
app.post('/photos',postControllers.createPost);

// ana sayfada sıralanan postlardan birine tıkladığımızda detaylarına girer
app.get('/post/:id', postControllers.getPostDetail);

// postu güncelleme
app.put('/post/:id', postControllers.updatePost);

// postumuzu sililiyoruz
app.delete('/post/:id', postControllers.deletePost);

// about sayfamıza yönlendirme
app.get('/about', pageControllers.getAboutPage );

// yeni post oluşturma sayfamıza yönlendirme
app.get('/add_post', pageControllers.getAddNewPost);

// postun detayından update bastıgımızda güncellemek için edit sayfası acılır  bilgiler gönderilir
app.get('/post/edit/:id', pageControllers.getEditPage);




const port = 3000;
app.listen(port, () => {
    console.log(`Sunucu ${port} portunda başlatıldı..`);
});
