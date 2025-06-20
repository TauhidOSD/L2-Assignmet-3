import { RequestHandler } from "express";
import { Book } from "../models/Book";
import { Borrow } from "../models/Borrow";

export const borrowBook: RequestHandler = async (req, res) => {
  try {
    const { book, quantity, dueDate } = req.body;

    const foundBook = await Book.findById(book);

    if (!foundBook) {

      res.status(404).json({ success: false, message: 'Book not found' });
      return;  
    }

    if (foundBook.copies < quantity) {

      res.status(400).json({ success: false, message: 'Not enough copies available' });
      return;
    }

    foundBook.copies -= quantity;

    foundBook.available = foundBook.copies > 0;

    await foundBook.save();

    const borrowRecord = await Borrow.create({ book, quantity, dueDate });

    res.json({
      success: true,
      message: 'Book borrowed successfully',
      data: borrowRecord,
    });
  } catch (error) {

    res.status(500).json({ success: false, message: 'Internal server error', error });
  }
};

export const getBorrowedSummary: RequestHandler = async (req, res) => {
  try {
    const summary = await Borrow.aggregate([

      { $group: { _id: '$book', totalQuantity: { $sum: '$quantity' } } },

      { $lookup: { from: 'books', localField: '_id', foreignField: '_id', as: 'book' } },

      { $unwind: '$book' },

       { $project: { _id: 0, book: { title: '$book.title', isbn: '$book.isbn' }, totalQuantity: 1 } }

    ]);

    res.json({
      success: true,
      message: 'Borrowed books summary retrieved successfully',
      data: summary,
    });
  } catch (error) {
    
    res.status(500).json({ success: false, message: 'Internal server error', error });
  }
};
