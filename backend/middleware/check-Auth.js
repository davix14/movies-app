const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  try {
    if(req.method === 'OPTIONS'){
      console.log('OPTIONS!!!');
      next();
    }
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(token, 'secret-should-be-longer');
    req.body.userId = decodedToken.userId;
    next();
  } catch (e) {
    res.status(401).json({
      message: 'Authorization Failed',
      success: false
    });
  }
}
