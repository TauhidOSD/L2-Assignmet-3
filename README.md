
# Library Management API

This project is a simple Library Management API built with **Express**, **TypeScript**, and **MongoDB** using Mongoose.  
It allows you to manage books and borrowing records in a library.

---

## What This Project Does

- You can add new books with details like title, author, genre, ISBN, description, copies, and availability.
- You can get all books with options to filter by genre, sort, and limit results.
- You can get details of a single book by its ID.
- You can update book details, like the number of copies.
- You can delete a book.
- You can borrow books, which reduces the number of available copies.
- You can see a summary of all borrowed books, showing total borrowed quantities.

---

## Important Features

- **Schema Validation:** All data fields are checked properly (e.g., title and author are required, genre must be from a list).
- **Business Logic:** When borrowing, it checks if enough copies are available and updates the availability status.
- **Aggregation:** Uses MongoDB aggregation to show total borrowed quantities for each book.
- **Mongoose Features:** Uses instance methods to update book availability and middleware to log book saves.
- **Filtering & Sorting:** Get books filtered by genre and sorted by different fields.

---

## API Endpoints

### 1. Create Book  
`POST /api/books`  
Send book details in JSON to add a new book.

### 2. Get All Books  
`GET /api/books`  
Supports filtering by genre, sorting, and limiting results with query parameters.

### 3. Get Book by ID  
`GET /api/books/:bookId`  
Get a single book’s details.

### 4. Update Book  
`PUT /api/books/:bookId`  
Update book details like the number of copies.

### 5. Delete Book  
`DELETE /api/books/:bookId`  
Remove a book from the library.

### 6. Borrow a Book  
`POST /api/borrow`  
Borrow a book by specifying book ID, quantity, and due date. It checks availability and updates copies.

### 7. Borrowed Books Summary  
`GET /api/borrow`  
Shows total borrowed copies per book using aggregation.

---

## Error Handling

- The API sends clear error messages if something goes wrong, like missing books or not enough copies.
- Validation errors are shown with details about what is wrong.

---

## How to Run

1. Clone the repo.  
2. Install dependencies with `npm install`.  
3. Set your MongoDB connection string in `.env`.  
4. Start the server with `npm run dev`.  
5. Use Postman or any API client to test the endpoints.




Thank you for checking out my project! 