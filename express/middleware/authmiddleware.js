const jwt = require('jsonwebtoken');

const isAuthenticated = (req, res, next) => { //fungsi untuk memindahkan eksekusi ke middleware atau endpoint berikutnya
  try {
    const token = req.headers.authorization.split(' ')[1]; // Extract token from the Authorization header
    const decoded = jwt.verify(token, 'lalaindri'); //untuk memverifikasi token

    //menyimpan data user dari hasil verifikasi token  
    req.user = decoded.user;

    next(); // melanjutkna eksekusi middleware
  } catch (error) {
    console.error(error);
    return res.status(401).json({ error: 'Invalid token' });
  }
};

//fungsi agar modul lain dapat mengimpor
module.exports = isAuthenticated;