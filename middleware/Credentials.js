
const Credentials = (req, res, next ) => {
  if(req?.headers) {res.header('Access-Control-Allow-Credentials',true);
}

  next();
}

module.exports = Credentials