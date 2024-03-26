import { Router } from "express";
import {
  borrarProducto,
  crearProducto,
  editarProducto,
  listarProductos,
  obtenerProducto,
} from "../controllers/productos.controllers.js";
import { check } from "express-validator";
import validacionProducto from "../helpers/validacionProducto.js";
import validarJWT from "../helpers/validarJWT.js";

const router = Router();

router
  .route("/productos")
  .get(listarProductos)
  .post([validarJWT, validacionProducto],crearProducto);
router
  .route("/productos/:id")
  .get(obtenerProducto)
  .put([validarJWT, validacionProducto],editarProducto)
  .delete([validarJWT], borrarProducto);

export default router;
