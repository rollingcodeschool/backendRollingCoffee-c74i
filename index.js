import express from 'express'
import cors from 'cors'
import morgan from 'morgan';
import 'dotenv/config'; //permite procesar variables de entorno
// node --watch index.js comando experimental para desarrollo
console.log('bienvenidos c74i')

// 1- configurar un puerto
const app = express();

app.set('port', process.env.PORT || 4000 )
app.listen(app.get('port'), ()=>{
    console.log('Estoy en el puerto '+app.get('port'));
})
// 2- configurar middlewares
app.use(cors()); //permite conexiones remotas
app.use(morgan('dev')) //muestra informacion extra en la terminal
app.use(express.json()) //permite interpretar el formato json
app.use(express.urlencoded({extended:true})) //me permite interpretar los datos del body de un request

// 3- configuracion de las rutas
app.get('/', (req, res)=>{
 console.log('hola mundo');
 res.send('desde el backend de rollingCoffee');
})