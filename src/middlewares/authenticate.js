const jwt = require('jsonwebtoken');

exports.authenticate = (req, res, next)=>{
  const token = req.headers.authorization.split(' ')[1];
  const decoded = jwt.decode(token);
  req.role = decoded.role;
  next();
}
