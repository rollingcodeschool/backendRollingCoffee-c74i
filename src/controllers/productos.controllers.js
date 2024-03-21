import { validationResult } from "express-validator";
import Producto from "../database/models/producto.js";

export const listarProductos = async (req, res) => {
  try {
    const productos = await Producto.find();
    res.status(200).json(productos);
  } catch (error) {
    console.error(error);
    res.status(404).json({
      mensaje: "No se pudo obtener la lista de productos",
    });
  }
};

export const crearProducto = async (req, res) => {
  try {
  

    const productoNuevo = new Producto(req.body);
    //pedirle a la BD guardar el producto nuevo
    await productoNuevo.save();
    //enviar la respuesta al front
    res.status(201).json({
      mensaje: "El producto fue creado correctamente",
    });
  } catch (error) {
    console.error(error);
    res.status(400).json({
      mensaje: "El producto no pudo ser dado de alta",
    });
  }
};

export const obtenerProducto = async (req, res) => {
  try {
    //extraer el parametro id
    console.log(req.params.id);
    //buscar el producto en la BD
    const productoBuscado = await Producto.findById(req.params.id);
    //responder con el producto
    res.status(200).json(productoBuscado);
  } catch (error) {
    console.error(error);
    res.status(404).json({ mensaje: "No se encontro el producto buscado" });
  }
};

export const editarProducto = async (req, res) => {
  try {
    //extraer el id del producto a editar y los datos del producto a editar del req.body
    //buscar si encontramos el producto con el id
    const productoBuscado =  await Producto.findById(req.params.id);
    //no encontre el producto buscado?
    if(!productoBuscado){
        //enviar un mensaje de error en caso de no encontrar el producto
        return res.status(404).json({mensaje: "El producto no fue encontrado."});
    }
    //editar el producto
    await Producto.findByIdAndUpdate(req.params.id, req.body);
    //contestamos al front con un status 200
    res.status(200).json({mensaje: "El producto fue editado correctamente"})
  } catch (error) {
    console.error(error);
    res.status(500).json({mensaje: "Ocurrio un error al editar el producto"})
  }
};

export const borrarProducto = async (req, res) => {
  try {
    const productoBuscado =  await Producto.findById(req.params.id);
    //no encontre el producto buscado?
    if(!productoBuscado){
        //enviar un mensaje de error en caso de no encontrar el producto
        return res.status(404).json({mensaje: "El producto no fue encontrado."});
    }
    //borrar el producto
    await Producto.findByIdAndDelete(req.params.id);
    //contestamos al front con un status 200
    res.status(200).json({mensaje: "El producto fue borrado correctamente"})
  } catch (error) {
    console.error(error);
    res.status(500).json({mensaje: "Ocurrio un error al borrar el producto"})
  }
};
