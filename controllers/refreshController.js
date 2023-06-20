const Users = require("../model/usersDB");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const refreshToken = async (req, res) => {
  const currentcookies = req.cookies;
  if (!currentcookies?.jwt)
    return res.status(400).json(`no req or no cookies ${currentcookies?.jwt}`);
  const refreshToken = currentcookies.jwt; //currentcookies.split(' ')[1]
  // console.log(refreshToken)
  try {
    const foundUser = await Users.findOne({
      refreshToken: refreshToken,
    }).exec();
    if (!foundUser)
      return res
        .status(403)
        .json(`No refreshToken or token is not valid ${refreshToken}`);

    jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET,
      (err, decoded) => {
        if (err) return res.sendStatus(500);
        const userid = foundUser._id;

        const accessToken = jwt.sign(
          {
              "email": decoded.email,
            
          },
          process.env.ACCESS_TOKEN_SECRET,
          { expiresIn: "10m" }
        );
        res.status(200).json({userid ,accessToken });
      }
    );
  } catch (err) {
    console.error(err);
  }
};

module.exports = refreshToken;
