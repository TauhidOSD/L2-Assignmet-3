import { Request, Response } from "express";
import { Book } from "../models/Book";

//create book
export const createBook = async (req: Request, res: Response) => {
  try {
    const book = await Book.create(req.body);
    res.status(201).json({
      success: true,
      message: "Book created successfully",
      data: book,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Validation failed",
      error,
    });
  }
};

// get all Books
export const getAllBooks = async (req: Request, res: Response) => {
  try {
    const { filter, sortBy = "createdAt", sort = "asc", limit = 10 } = req.query;

    const query: any = {};
    if (filter) {
      query.genre = filter;
    }

    const books = await Book.find(query)
      .sort({ [sortBy as string]: sort === "desc" ? -1 : 1 })
      .limit(Number(limit));

    res.json({
      success: true,
      message: "Books retrieved successfully",
      data: books,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error,
    });
  }
};

// get book by Id

export const getBookById = async (req: Request, res: Response) => {
  try {
    const book = await Book.findById(req.params.bookId);

    if (!book) {
      res.status(404).json({ success: false, message: "Book not found" });
      return;
    }

    res.json({
      success: true,
      message: "Book retrieved successfully",
      data: book,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal Server Error", error });
  }
};



// update book

export const updateBook = async (req: Request, res: Response) => {
  try {
    const book = await Book.findByIdAndUpdate(req.params.bookId, req.body, {
      new: true,
      runValidators: true,
    });

    if (!book) {
      res.status(404).json({ success: false, message: "Book not found" });
      return;
    }

    res.json({
      success: true,
      message: "Book updated successfully",
      data: book,
    });
  } catch (error) {
    res.status(400).json({ success: false, message: "Validation failed", error });
  }
};

// delete book

export const deleteBook = async (req: Request, res: Response) => {
  try {
    const book = await Book.findByIdAndDelete(req.params.bookId);

    if (!book) {
      res.status(404).json({ success: false, message: "Book not found" });
      return;
    }

    res.json({ success: true, message: "Book deleted successfully", data: null });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal Server Error", error });
  }
};
