import Producto from "../database/models/producto.js"

export const listarProductos = async(req, res)=>{
    try{
        const productos = await Producto.find();
        res.status(200).json(productos)

    }catch(error){
        console.log(error)
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
        console.log(error);
        res.status(400).json({
            mensaje: "El producto no pudo ser dado de alta"
        })
    }
}

