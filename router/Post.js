const router = require('express').Router();
const Post = require('../Modal/Post');

router.post('/new/post', async (req, res) => {
    // try {
    //     const post = await user.create(req.body);
    //     res.status(200).json(post);
    // } catch (err) {
    //     res.status(500).json(err);
    // }
});

module.exports = router;