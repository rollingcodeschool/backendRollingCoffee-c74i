import { check } from "express-validator";
import resultadoValidacion from "./resultadoValidacion.js";

const validacionProducto = [
  check("nombreProducto")
    .notEmpty()
    .withMessage("El nombre del producto es un dato obligatorio")
    .isLength({ min: 2, max: 30 })
    .withMessage("El nombre del producto debe tener entre 2 y 30 caracteres"),
  check("precio")
    .notEmpty()
    .withMessage("El precio es un dato obligatorio")
    .isNumeric()
    .withMessage("El precio debe ser un valor numerico")
    .custom((value) => {
      if (value >= 100 && value <= 10000) {
        return true;
      } else {
        throw new Error("El precio debe estar entre $100 y $10000");
      }
    }),
  check("imagen")
    .notEmpty()
    .withMessage("La imagen es un dato obligatorio")
    .matches(/(http)?s?:?(\/\/[^"']*\.(?:png|jpg|jpeg|gif|svg))/i)
    .withMessage(
      "La imagen debe tener el formato de una url valida y terminar en (png|jpg|jpeg|gif|svg)"
    ),
  check("categoria")
    .notEmpty()
    .withMessage("La categoria es un dato obligatorio")
    .isIn(["Infusiones", "Batidos", "Dulce", "Salado"])
    .withMessage(
      "La categoria debe ser una de las siguientes opciones ('Infusiones','Batidos','Dulce','Salado')"
    ),
  check("descripcion_breve")
    .notEmpty()
    .withMessage("La descripcion breve es un dato obligatorio")
    .isLength({ min: 10, max: 100 })
    .withMessage("La descripcion breve debe tener entre 10 y 100 caracteres"),
  check("descripcion_amplia")
    .notEmpty()
    .withMessage("La descripcion apmplia es un dato obligatorio")
    .isLength({ min: 20, max: 1000 })
    .withMessage("La descripcion amplia debe tener entre 20 y 1000 caracteres"),
  (req, res, next) => resultadoValidacion(req, res, next),
];

export default validacionProducto;
