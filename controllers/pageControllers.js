const Photo = require ('../models/Photo')

exports.getAboutPage = (req, res) => {
    res.render('about');
}


exports.getAddNewPost = (req, res) => {
    res.render('add_post');
}

exports.getEditPage =async (req, res) => {
    const photo = await Photo.findOne({_id: req.params.id})
    res.render('edit', {
        photo
    });
}