import { TokenDecode } from "../utility/tokenUtility.js";

export default (req, res, next) => {
  let token = req.headers['token'] || req.cookies['token'];

  if (!token) {
    res.status(401).send({status: 'fail', message: 'Unauthorized: No token provided'});
    return;
  }

  let decoded;
  try {
    decoded = TokenDecode(token);
  } catch (error) {
    res.status(401).send({status: 'fail', message: 'Unauthorized: Invalid token'});
    return;
  }

  if (!decoded || !decoded.email || !decoded.user_id) {
    res.status(401).send({status: 'fail', message: 'Unauthorized: Token missing data'});
    return;
  }

  // If decoded successfully and data is present, add it to the request headers
  req.headers.email = decoded.email;
  req.headers.user_id = decoded.user_id;

  next();
}
