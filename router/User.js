const router = require('express').Router();
const User = require('../Modal/User');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwt = require('jsonwebtoken');


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

module.exports = router;