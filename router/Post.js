const router = require('express').Router();
const Post = require('../Modal/Post');
const verifyToken = require('./verifyToken');

router.post('/new/post', verifyToken, async (req, res) => {

    try {
        const { title, image } = req.body;
        console.log(title, image);

        const post = await Post.create({
            title: title,
            image: image,
            user: req.user.id
        });
        console.log(post);
        res.status(200).json(post);
    } catch (error) {
        res.status(500).json("Internal Server Error");
    }

});

router.post('/all/post/by/user', verifyToken, async (req, res) => {

    try {
        const post = await Post.find({ user: req.user.id });
        if (!post) {
            return res.status(200).json("No post found");
        }
        return res.status(200).json(post);



    } catch (error) {
        res.status(500).json("Internal Server Error");
    }

});

router.put('/:id/like', verifyToken, async (req, res) => {
    
        try {
            const post = await Post.findById(req.params.id);
            if (post.likes.includes(req.user.id)) {
                await post.updateOne({ $pull: { likes: req.user.id } });
                res.status(200).json("Post disliked");
            } else {
                await post.updateOne({ $push: { likes: req.user.id } });
                res.status(200).json("Post liked");
            }
        } catch (error) {
            res.status(500).json("Internal Server Error");
        }
    
    });
    
    router.put('/comment/post', verifyToken, async (req, res) => {

        try {
            const { comment, postid, profile } = req.body;

            const comments = {
                user: req.user.id,
                username: req.user.username,
                profile,
                comment
            }
            const post = await Post.findById(postid);
            post.comments.push(comments);
            await post.save();
            return res.status(200).json(post);

        } catch (error) {
            res.status(500).json(error);
            console.log(error);
        }

    });


    module.exports = router;
