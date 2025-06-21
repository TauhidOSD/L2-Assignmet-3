"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteBook = exports.updateBook = exports.getBookById = exports.getAllBooks = exports.createBook = void 0;
const Book_1 = require("../models/Book");
//create book
const createBook = async (req, res) => {
    try {
        const book = await Book_1.Book.create(req.body);
        res.status(201).json({
            success: true,
            message: "Book created successfully",
            data: book,
        });
    }
    catch (error) {
        res.status(400).json({
            success: false,
            message: "Validation failed",
            error,
        });
    }
};
exports.createBook = createBook;
// get all Books
const getAllBooks = async (req, res) => {
    try {
        const { filter, sortBy = "createdAt", sort = "asc", limit = 10 } = req.query;
        const query = {};
        if (filter) {
            query.genre = filter;
        }
        const books = await Book_1.Book.find(query)
            .sort({ [sortBy]: sort === "desc" ? -1 : 1 })
            .limit(Number(limit));
        res.json({
            success: true,
            message: "Books retrieved successfully",
            data: books,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error,
        });
    }
};
exports.getAllBooks = getAllBooks;
// get book by Id
const getBookById = async (req, res) => {
    try {
        const book = await Book_1.Book.findById(req.params.bookId);
        if (!book) {
            res.status(404).json({ success: false, message: "Book not found" });
            return;
        }
        res.json({
            success: true,
            message: "Book retrieved successfully",
            data: book,
        });
    }
    catch (error) {
        res.status(500).json({ success: false, message: "Internal Server Error", error });
    }
};
exports.getBookById = getBookById;
// update book
const updateBook = async (req, res) => {
    try {
        const book = await Book_1.Book.findByIdAndUpdate(req.params.bookId, req.body, {
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
    }
    catch (error) {
        res.status(400).json({ success: false, message: "Validation failed", error });
    }
};
exports.updateBook = updateBook;
// delete book
const deleteBook = async (req, res) => {
    try {
        const book = await Book_1.Book.findByIdAndDelete(req.params.bookId);
        if (!book) {
            res.status(404).json({ success: false, message: "Book not found" });
            return;
        }
        res.json({ success: true, message: "Book deleted successfully", data: null });
    }
    catch (error) {
        res.status(500).json({ success: false, message: "Internal Server Error", error });
    }
};
exports.deleteBook = deleteBook;
