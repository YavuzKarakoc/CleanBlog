const Photo = require ('../models/Photo')
const fs = require('fs');


exports.getAllPost = async (req, res) => {
  // res.sendFile(path.resolve(__dirname, 'view/index.ejs'))
  const photos = await Photo.find({});
  res.render('index', {
    photos,
  });
};


exports.getPostDetail = async (req, res) => {
    const photo = await Photo.findById(req.params.id);
    res.render('post', {
        photo,
    });
}


exports.createPost =  async (req, res) => {
    //   await Photo.create(req.body);
    //   res.redirect('/');
   const uploadDir = 'public/uploads';

  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
  }

  let uploadeImage = req.files.image;
  let uploadPath = __dirname + '/../public/uploads/' + uploadeImage.name;

  uploadeImage.mv(uploadPath, async () => {
    await Photo.create({
      ...req.body,
      image: '/uploads/' + uploadeImage.name,
    });
    res.redirect('/');
  });
}


exports.updatePost = async (req, res) => {
    const photo = await Photo.findById(req.params.id);
    photo.title=req.body.title
    photo.detail=req.body.detail
    photo.save()
    res.redirect(`/post/${req.params.id}`)
}


exports.deletePost =  async (req, res) =>{
    const photo = await Photo.findOne({_id: req.params.id})
    let deleteImg=  __dirname + '/../public' + photo.image ;
    fs.unlinkSync(deleteImg);
    await Photo.findByIdAndRemove(req.params.id);
    res.redirect('/')
}