const usersDB = {
  users: require('../model/users.json'),
  setUsers: function (data) {
    this.users = data;
  },
};
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const fsPromises = require('fs').promises;
const path = require('path');

const handleLogin = async (req, res) => {
  const { user, pwd } = req.body;
  if (!user || !pwd)
    return res
      .status(400) //bad request
      .json({ message: 'Username and password are required.' });

  const foundUser = usersDB.users.find(
    (person) => person.username === user
  );
  if (!foundUser) return res.sendStatus(401); //Unauthorized

  // evaluate password
  const match = await bcrypt.compare(pwd, foundUser.password);
  if (match) {
    //get user roles
    const roles = Object.values(foundUser.roles);

    // create JWTs(access token and refresh token)
    const accessToken = jwt.sign(
      {
        UserInfo: {
          username: foundUser.username, //do not pass anything sensetive about the user like passwords because this could harm the security of your api end points
          roles: roles,
        },
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: '30s' } //in production you can set this to 5 minutes or 15. Just some small window of time
    );

    const refreshToken = jwt.sign(
      { username: foundUser.username },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: '1d' }
    );

    // Saving refreshToken with current user
    //This creates the array of other users that are not the user that is loggedin
    const otherUsers = usersDB.users.filter(
      (person) => person.username !== foundUser.username
    );

    const currentUser = { ...foundUser, refreshToken };
    usersDB.setUsers([...otherUsers, currentUser]);

    await fsPromises.writeFile(
      path.join(__dirname, '..', 'model', 'users.json'),
      JSON.stringify(usersDB.users)
    );

    //send both tokens back to the user
    // the httpOnly cookie is not available to js
    res.cookie('jwt', refreshToken, {
      httpOnly: true,
      sameSite: 'None',
      secure: true,
      maxAge: 24 * 60 * 60 * 1000, //This means one day
    });
    /* 
      On the front end you need to store this token in memory as it is not secure in localstorage
      Any cookie that you can access with js a hacker can also access. By keeping it in memory you are
      not storing it anywhere vulnerable
    */
    res.json({ accessToken });
  } else {
    res.sendStatus(401); //unauthorized
  }
};

module.exports = { handleLogin };
