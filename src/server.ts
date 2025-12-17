import express from 'express';
import routes from './routes/index'
import swaggerUi from 'swagger-ui-express';
import { swaggerSpec } from './docs/swagger';

const app = express();

app.use(express.json());

app.use("/api", routes) ;
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));


export default app;