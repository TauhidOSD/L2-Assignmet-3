import express from 'express';
import cors from 'cors';
import borrowRoutes from './app/routes/borrow.routes';
import bookRoutes from './app/routes/book.routes';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/borrow', borrowRoutes);
app.use('/books', bookRoutes);

export default app;
