const User = require('../model/User');
const bcrypt = require('bcrypt');

const handleNewUser = async (req, res) => {
  const { user, pwd } = req.body;
  if (!user || !pwd)
    return res
      .status(400)
      .json({ message: 'Username and password are required.' });

  // check for duplicate usernames in the db
  const duplicate = await User.findOne({ username: user }).exec();

  if (duplicate) return res.sendStatus(409); //Conflict

  //no conflict
  try {
    //encrypt the password
    const hashedPwd = await bcrypt.hash(pwd, 10); //ten salt rounds

    //create and store the new user
    const result = await User.create({
      username: user,
      password: hashedPwd,
    });

    //another which is often used to create and store data is like below
    /*
    const newUser = new User();
    newUser.username = user;
    newUser.password = hashedPwd;

    //save the data
    const result = await newUser.save();

    OR 
    const newUser = new User({
      username: user,
      password: hashedPwd,
    });

    //save the data
    const result = await newUser.save();

    The create method just allows us to create and store the data at the same time
    */

    console.log(result);

    res.status(201).json({ success: `New user ${user} created!` });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { handleNewUser };
