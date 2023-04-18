import express from 'express';
import cors from 'cors';
import routes from './routes';
import connection from './config/database';

const app = express();

app.use(cors());
app.use(express.json());

app.use(routes);

const port = 8888;

connection.then(() => {
    console.log(' Banco de dados conectado!')
    app.listen(port, () => {
        console.log(`🚀 Aplicação online na porta ${port}`)
    });
}).catch((err) => console.log(err));