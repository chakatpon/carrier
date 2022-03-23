// verify the token and return it if it's valid
app.get("/verifyToken", function (req, res) {
  // check header or url parameters or post parameters for token
  var token = req.query.token;
  if (!token) {
    return res.status(400).json({
      error: true,
      message: "Token is required."
    });
  }

  // check token that was passed by decoding token using secret
  jwt.verify(token, process.env.JWT_SECRET, function (err, user) {
    if (err)
      return res.status(401).json({
        error: true,
        message: "Invalid token."
      });

    // return 401 status if the userId does not match.
    if (user.userId !== userData.userId) {
      return res.status(401).json({
        error: true,
        message: "Invalid user."
      });
    }
    // get basic user details
    var userObj = utils.getCleanUser(userData);
    return res.json({ user: userObj, token });
  });
});
