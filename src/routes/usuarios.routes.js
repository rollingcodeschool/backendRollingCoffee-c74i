import { Router } from "express";
import { crearUsuario, obtenerUsuarios } from "../controllers/usuarios.controllers.js";

const router = Router();

router.route("/usuarios").post(crearUsuario).get(obtenerUsuarios);

export default router;