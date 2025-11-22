import express , {Application} from 'express';
const app: Application = express();
import cors from 'cors';
import router from './app/routes';
import notFound from './app/middleware/notFound';
import globalErrorHandler from './app/middleware/globalErroHandler';


app.use(cors({
    origin: ['http://localhost:3000'],
    credentials:true
}))
app.use(express.json());
app.use('/api',router);
app.get('/',(req,res)=>{
    res.send('Service Manage API is running...');
})
app.use(globalErrorHandler);
app.use(notFound);

export default app;