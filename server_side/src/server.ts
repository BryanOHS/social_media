import express, { Express, Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';
dotenv.config();
import AuthRouter from './Routers/AuthRouter'
import PostRouter from './Routers/PostRouters'
import UserRouter from './Routers/UserRouter';

const app: Express = express();
app.use(express.json());

const PORT: number = parseInt(process.env.PORT as string, 10) || 4000;

app.get('/', (req: Request, res: Response) => {
    res.status(200).send('Hello, world! Welcome to my TypeScript server.');
});
app.use('/auth', AuthRouter)
app.use('/post', PostRouter)
app.use('/user', UserRouter)

app.use((req: Request, res: Response, next: NextFunction) => {
    res.status(404).send("Sorry can't find that!!!!!");
});

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}/`);
});
