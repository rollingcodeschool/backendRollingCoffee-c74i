import Usuario from "../database/models/usuario.js";
import bcrypt from 'bcrypt';

export const crearUsuario = async (req, res) => {
  try {
    const {email, password} = req.body;
    //verificar si el email ya esta guardado
    const usuarioBuscado = await Usuario.findOne({email});
    if(usuarioBuscado){
      //si existe un usuario con el mail
      return res.status(400).json({mensaje: 'Ya existe un usuario con el email enviado'})
    }
    const usuarioNuevo = new Usuario(req.body);
    //encriptar la contraseña
    const salt = bcrypt.genSaltSync(10);
    usuarioNuevo.password = bcrypt.hashSync(password, salt)
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
      message: "no se pudo encontrar los usuarios",
    });
  }
};