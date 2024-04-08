const router = require('express').Router();
const User = require('../Modal/User');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwt = require('jsonwebtoken');
const verifyToken = require('./verifyToken');
const Post = require('../Modal/Post');



router.post('/new/user', async (req, res) => {

    try {
   

        let user = await User.findOne({ email: req.body.email });

        if (user) {
            return res.status(200).json("User already exists");
        } else {
            const { email, username, password, profile } = req.body;
            const salt = bcrypt.genSaltSync(saltRounds);
            const hash = bcrypt.hashSync(password, salt);
            user = await User.create({ email: email, username: username, password: hash, profile: profile });

            const accessToken = jwt.sign({ id: user._id, username: user.username },
                process.env.JWT_SECRET);
            res.status(200).json({ user, accessToken });
        }
    } catch (err) {
        res.status(400).json("Internal Server Error");
    }
}
);


router.get('/login', async (req, res) => {

  
    try {

        let user = await User.findOne({ email: req.body.email });

        if (user) {
            const comparepassword = bcrypt.compareSync(req.body.password, user.password);
            if(!comparepassword){
                return res.status(200).json("Wrong password");
            }else{
                 accessToken = jwt.sign({ id: user._id, username: user.username },
                process.env.JWT_SECRET);
            }
            const {password, ...others} = user._doc;
            return res.status(200).json({others, accessToken});
        } 
    } catch (err) {
        res.status(400).json("Internal Server Error");
    }
}
);


router.put("/:id/follow", verifyToken, async (req, res) => {
    try {
        if (req.params.id !== req.body.user) {

            const user = await User.findById(req.params.id);
            const otheruser = await User.findById(req.body.user);
      
            
            if (!user.followers.includes(req.user.id)) {
                await user.updateOne({ $push: { followers: req.body.user } });
                await otheruser.updateOne({ $push: { following: req.params.id } });
                res.status(200).json("user has been followed");
            } else {
                await user.updateOne({ $pull: { following: req.body.user } });
                await otheruser.updateOne({ $pull: { followers: req.params.id } });
                res.status(200).json("user has been unfollowed");
            }
        }
    } catch (err) {
        res.status(500).json("Internal Server Error");
        console.log(err)
    }
});



router.get("/flw/:id", verifyToken, async (req, res) => {
    try {
        const user = await User.findById(req.params.id
        );
        const followersPost = await Promise.all(
            user.followings.map((item) => {
                return Post.find({ user: item });
            })
        );
        const userPost = await Post.find({ user: user._id });
        const filterProduct = userPost.concat(...followersPost);
        
        filterProduct.forEach((p) => {  
            const postAge = new Date - new Date(p.createdAt);
            const ageWeight = 1 - postAge / (1000 * 60 * 60 * 24); //weight decreased as post gets older
            const likeWeight = p.likes.length / 100; //weight increased as likes increase
            const commentWeight = p.comments.length / 100; //weight increased as comments increase
            p.weight = ageWeight + likeWeight + commentWeight;

        }
        ); 

        filterProduct.sort((a, b) => b.weight - a.weight);
        return res.status(200).json(filterProduct);

    } catch (err) {
        res.status(500).json("Internal Server Error");
        console.log(err)
    }
}
);

module.exports = router;