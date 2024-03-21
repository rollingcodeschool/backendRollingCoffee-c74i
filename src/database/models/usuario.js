import mongoose, {Schema} from "mongoose";

const usuarioSchema = new Schema({
    email: {
      type: String,
      required: true,
      validate: {
        validator: (valor) => {
          const pattern =
            /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
          return pattern.test(valor);
        },
        message: (props) => `${props.value} no es un email válido`,
      },
      minLength: 10,
      maxLength: 350,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      minLength: 8,
      maxLength: 16,
      validate: {
        validator: (valor) => {
          const pattern = /^(?=\w*\d)(?=\w*[A-Z])(?=\w*[a-z])\S{8,16}$/;
          return pattern.test(valor);
        },
        message: (props) => `${props.value} no es una contraseña válida`,
      },
    },
  });