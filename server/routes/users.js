const express = require('express');
const router = express.Router();
const User = require('../database/modals/User')
const { createJwtToken } = require('../middleware/createJwtToken');


/* GET users listing. */
router.post('/google', async(req, res) => {
  const {googleId, imageUrl, email, name} = req.body;
  let user = await User.findOne({email})
  if (!user) {
    user = await User({googleId, imageUrl, email, name, validated:true});
    await user.save();
  }
  let jwtToken = await createJwtToken(user);
  return res.status(200).json({
    status: "success",
    message: "Successfully logged in",
    token: jwtToken,
    user: user._id,
    name: user.name,
    profilePic: user.imageUrl,
  });

});

module.exports = router;
