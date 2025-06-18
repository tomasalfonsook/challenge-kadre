const { body, param } = require("express-validator");

const validarViaje = [
  body("camion").isString().notEmpty(),
  body("conductor").isString().notEmpty(),
  body("origen").isString().notEmpty(),
  body("destino").isString().notEmpty(),
  body("combustible").isString().notEmpty(),
  body("cantidad_litros")
    .isNumeric()
    .withMessage("La cantidad de litros debe ser un número")
    .isFloat({ max: 30000 })
    .withMessage("La cantidad de litros no puede ser mayor a 30000"),
  body("fecha_salida").isISO8601().toDate(),
];

const validarId = [param("id").isMongoId().withMessage("ID no es válido")];

module.exports = {
  validarViaje,
  validarId,
};
