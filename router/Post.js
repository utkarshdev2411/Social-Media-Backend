const router = require('express').Router();
const Post = require('../Modal/Post');
const verifyToken = require('./verifyToken');

router.post('/new/post',verifyToken, async (req, res) => {
   const {title, image} = req.body;
   console.log(title, image);

   const post=await Post.create({title:title, 
    image:image,
     user: req.user.id});
     console.log(post);
res.status(200).json(post);
});


module.exports = router;