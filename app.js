const express = require('express');
const mongoose = require('mongoose');
const ejs = require('ejs');
const path = require('path')
const Photo = require('./models/Photo')




const app = express();

// Connect DB
mongoose.connect('mongodb://localhost/cleanblog-test-db', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // useFİndAndModify:false,
    // useCreateIndex:true,
}).then(() => {
    console.log('DB Connected Successfuly')
});

//template engine
app.set("view engine", "ejs")

// MIDDLEWARES
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// app.get('/', (req, res) => {
//   const blog = {id: 1, title: 'Blog title', description: 'Blog description',};
//   res.send(blog);
// });

//Routes
app.get('/', async (req, res) => {
    // res.sendFile(path.resolve(__dirname, 'view/index.ejs'))
    const photos = await Photo.find({});
    res.render('index', {
        photos
    })
})
app.get('/about', (req, res) => {
    res.render('about')
})
app.get('/add_post', (req, res) => {
    res.render('add_post')
})
app.post("/photos", async (req, res) => {
    await Photo.create(req.body);
    res.redirect("/");
});

app.get('/post/:id', async (req, res) => {
    const photo = await Photo.findById(req.params.id)
    res.render('post' ,{
        photo
    })
})


const port = 3000;
app.listen(port, () => {
    console.log(`Sunucu ${port} portunda başlatıldı..`);
});
