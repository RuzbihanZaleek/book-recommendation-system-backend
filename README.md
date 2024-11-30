# Book Recommendation System - Backend

## Project Overview

The backend for the **Book Recommendation System** is built using Node.js and Express. It handles user authentication, book CRUD operations, and reviews. It also integrates with Discord for seamless management of books and reviews via a Discord bot. Additionally, it provides an optional AI feature for personalized book recommendations using the ChatGPT API.

---

## Technologies Used

- **Framework**: Node.js with Express
- **Database**: PostgreSQL
- **ORM**: Sequelize
- **Authentication**: JSON Web Tokens (JWT)
- **Security**: bcrypt for password hashing
- **Bot Integration**: Discord.js
- **Testing**: Jest, Supertest
- **Environment Configuration**: dotenv

---

## Setup and Installation Instructions

### Prerequisites

Ensure you have the following installed:

- Node.js (v18 or higher)
- PostgreSQL
- npm or yarn package manager

### Steps

1. **Clone the repository:**
   ```bash
   git clone https://github.com/RuzbihanZaleek/book-recommendation-system-backend.git
   cd book-recommendation-system-backend

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. Set up the database:
    - Create a PostgreSQL database.
    - Configure the .env file with the following variables:
      ```bash
      PORT=3000
      DATABASE_URL=postgresql://<username>:<password>@<host>:<port>/<database>
      JWT_SECRET=<any jwt secret key>
      DISCORD_BOT_TOKEN=<discord bot token>
      API_URL=<backend url>/api
      ```
 4. Start the development server:
    ```bash
    npm run dev
    ```

### API Documentation

  1. **Authentication:**
      - POST /api/auth/login: User login.
      - POST /api/auth/signup: User registration.

  2. **Book Management:**
      - GET /api/books: Retrieve all books.
      - GET /api/books/search: Search Books.
      - GET /api/books/:id: Retrieve book by id.
      - POST /api/books: Add a new book.
      - PUT /api/books/:id: Update book details.
      - DELETE /api/books/:id: Delete a book.
    
  3. **Review Management:**
      - GET /api/reviews: Retrieve all reviews.
      - GET /api/reviews/user: Retrieve reviews by a user.
      - GET /api/reviews/book/:bookId: Retrieve reviews by book.
      - POST /api/reviews: Add a new review.
      - DELETE /api/reviews/:bookId: Delete a review.
    
  4. **User Library Management:**
      - GET /api/userbooks: Retrieve all books in the user's library.
      - GET /api/userbooks/:bookId: Retrieve library book by id.
      - POST /api/userbooks: Add a book to the library.
      - PUT /api/userbooks/:bookId: Update a book in the library.
      - DELETE /api/userbooks/:bookId: Remove a book from the library.

