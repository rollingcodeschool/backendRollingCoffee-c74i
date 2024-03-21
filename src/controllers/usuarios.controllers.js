import Usuario from "../database/models/usuario.js";

export const crearUsuario = async (req, res) => {
  try {
    //todo: agregar validaciones
    const usuarioNuevo = new Usuario(req.body);
    //encriptar la contraseña
    await usuarioNuevo.save();
    res.status(201).json({
      message: "Usuario dado de alta exitosamente",
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      message: "El usuario no pudo ser dado de alta",
    });
  }
};

export const obtenerUsuarios = async (req, res) => {
  try {
    const usuarios = await Usuario.find();
    res.status(200).json(usuarios);
  } catch (error) {
    console.log(error);
    res.status(404).json({
      message: "",
    });
  }
};