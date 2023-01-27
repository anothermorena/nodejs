const usersDB = {
  users: require('../model/users.json'),
  setUsers: function (data) {
    this.users = data;
  },
};
const fsPromises = require('fs').promises;
const path = require('path');

const handleLogout = async (req, res) => {
  // On client, also delete the accessToken when the logout button is clicked

  const cookies = req.cookies;
  if (!cookies?.jwt) return res.sendStatus(204); //No content
  const refreshToken = cookies.jwt;

  // Is refreshToken in db?.
  //find the user that has the token
  const foundUser = usersDB.users.find(
    (person) => person.refreshToken === refreshToken
  );

  //if no user found but a cookie was found so we clear it
  if (!foundUser) {
    res.clearCookie('jwt', {
      httpOnly: true,
      sameSite: 'None',
      secure: true, //forces it to use https
    });
    return res.sendStatus(204);
  }

  //Delete refreshToken in db
  const otherUsers = usersDB.users.filter(
    (person) => person.refreshToken !== foundUser.refreshToken
  );

  const currentUser = { ...foundUser, refreshToken: '' };
  usersDB.setUsers([...otherUsers, currentUser]);
  await fsPromises.writeFile(
    path.join(__dirname, '..', 'model', 'users.json'),
    JSON.stringify(usersDB.users)
  );

  res.clearCookie('jwt', {
    httpOnly: true,
    sameSite: 'None',
    secure: true,
  });
  res.sendStatus(204);
};

module.exports = { handleLogout };