const jwt = require("jsonwebtoken");

const generateJWT = (uid) => {
  const payload = { uid };

  return new Promise((resolve, reject) => {
    jwt.sign(
      payload,
      process.env.JWT_KEY,
      {
        expiresIn: "12h",
      },
      (err, token) => {
        if (err) {
          // No se pudo crear el token
          reject("No se pudo generar el JWT");
        } else {
          // TOKEN
          resolve(token);
        }
      }
    );
  });
};

const verifyJWT = (token = "") => {
  try {
    const { uid } = jwt.verify(token, process.env.JWT_KEY);
    return [true, uid];
  } catch (error) {
    return [false, null];
  }
};

module.exports = {
  generateJWT,
  verifyJWT,
};
