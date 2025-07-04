import express from 'express';
import cors from 'cors';
import borrowRoutes from './app/routes/borrow.routes';
import bookRoutes from './app/routes/book.routes';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/borrow', borrowRoutes);
app.use('/api/books', bookRoutes);

export default app;
