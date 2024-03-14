import Producto from "../database/models/producto.js"

export const listarProductos = async(req, res)=>{
    try{
        const productos = await Producto.find();
        res.status(200).json(productos)
    }catch(error){
        console.error(error)
        res.status(404).json({
            mensaje: "No se pudo obtener la lista de productos"
        })
    }
}

export const crearProducto = async(req, res)=>{
    try {
        //extraer los datos del body
        console.log(req.body);
        //todo: agregar la validacion de los datos del body
        const productoNuevo = new Producto(req.body);
        //pedirle a la BD guardar el producto nuevo
        await productoNuevo.save();
        //enviar la respuesta al front
        res.status(201).json({
            mensaje: "El producto fue creado correctamente"
        })
        
    } catch (error) {
        console.error(error);
        res.status(400).json({
            mensaje: "El producto no pudo ser dado de alta"
        })
    }
}


export const obtenerProducto = async(req, res)=>{
    try{
        //extraer el parametro id
        console.log(req.params.id);
        //buscar el producto en la BD
        const productoBuscado = await Producto.findById(req.params.id);
        //responder con el producto
        res.status(200).json(productoBuscado);
    }catch(error){
        console.error(error)
        res.status(404).json({mensaje: "No se encontro el producto buscado"})
    }
}
