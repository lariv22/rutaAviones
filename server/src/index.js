import express, { Router } from 'express';
import morgan from 'morgan';
import router from './routes/index.js';
const app = express();
 
//Configuraciones
app.set('port', process.env.PORT || 3000);
app.set('json spaces', 2)

//Middleware
app.use(morgan('dev'));
app.use(express.urlencoded({extended:false}));
app.use(express.json());
 
//Routes
app.use(router);

//Iniciando el servidor
app.listen(app.get('port'),()=>{
    console.log(`Server listening on port ${app.get('port')}`);
});