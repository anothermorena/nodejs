//accepts many parameters. Here we use the rest operator which works much like the spread operator
const verifyRoles = (...allowedRoles) => {
  return (req, res, next) => {
    if (!req?.roles) return res.sendStatus(401); //send an unauthorized status code if the request has no roles specified
    const rolesArray = [...allowedRoles];

    /* 
    
        On the code below, we are baiscally mapping over the roles that were assigned in the verified jwt
        and we are comparing them using the map function to the roles array. Once we are done checking them and
        we are getting either false or true results we use find to find the first true and if there  any truths
        it will be good and if there is not, it wont thus we return an unauthorized status code

    */

    const result = req.roles
      .map((role) => rolesArray.includes(role)) //check if the roles array includes the roles that we are passing in
      .find((val) => val === true);
    if (!result) return res.sendStatus(401);
    next(); //otherwise we can allow the route to be accessed and move on to processing the next part of the code.
  };
};

module.exports = verifyRoles;
