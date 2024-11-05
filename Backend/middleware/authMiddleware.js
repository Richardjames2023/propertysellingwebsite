import jwt from 'jsonwebtoken';

const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    return res.status(401).json({ message: 'Authorization denied' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Token is not valid' });
  }
};



// const verifyToken = (req, res, next) => {
//   try {
//     const authHeader = req.headers['authorization'];
//     if (!authHeader) {
//       return res.status(403).json({ message: "No token provided" });
//     }

//     const token = authHeader.split(' ')[1];
//     if (!token) {
//       return res.status(403).json({ message: "No token provided" });
//     }

//     // Verify token
//     const decoded = jwt.verify(token, process.env.JWT_KEY);
//     req.userId = decoded.id;
//     next();
//   } catch (err) {
//     return res.status(401).json({ message: "Unauthorized access", error: err.message });
//   }
// };


export default authMiddleware

