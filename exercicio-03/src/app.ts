import express from 'express';
import cors from 'cors';
import routes from './routes';

const app = express();

app.use(cors());
app.use(express.json());

app.use(routes);

const port = 6000;

app.listen(port, () => {
    console.log(`🚀 Aplicação online na porta ${port}`)
});