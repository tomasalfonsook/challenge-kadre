const { body } = require("express-validator");

const validarRegistro = [
  body("username")
    .isString()
    .trim()
    .notEmpty()
    .withMessage("El nombre de usuario es obligatorio"),

  body("password")
    .isString()
    .trim()
    .isLength({ min: 6 })
    .withMessage("La contraseña debe tener al menos 6 caracteres"),
];

const validarLogin = [
  body("username")
    .isString()
    .trim()
    .notEmpty()
    .withMessage("El nombre de usuario es obligatorio"),

  body("password")
    .isString()
    .trim()
    .notEmpty()
    .withMessage("La contraseña es obligatoria"),
];

module.exports = {
  validarRegistro,
  validarLogin,
};
