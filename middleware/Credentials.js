const Credentials = (req, res, next) => {
  try {
    if (req?.headers) {
      res.header("Access-Control-Allow-Credentials", true);
    }
  } catch (err) {
    res.json("cors issues", err);
  }

  next();
};

module.exports = Credentials;
