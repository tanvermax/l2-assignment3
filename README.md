# 📚 Library Management API

A RESTful API built with **Express**, **TypeScript**, and **MongoDB (Mongoose)** for managing a library system. It supports CRUD operations on books, borrowing logic with availability tracking, and an aggregation summary of borrowed books.

---

## 📖 Table of Contents

- [🎯 Objective](#-objective)
- [🚀 Features](#-features)
- [🛠️ Installation](#️-installation)
- [⚙️ Configuration](#️-configuration)
- [📦 API Endpoints](#-api-endpoints)
  - [1. Create Book](#1-create-book)
  - [2. Get All Books](#2-get-all-books)
  - [3. Get Book by ID](#3-get-book-by-id)
  - [4. Update Book](#4-update-book)
  - [5. Delete Book](#5-delete-book)
  - [6. Borrow a Book](#6-borrow-a-book)
  - [7. Borrowed Books Summary](#7-borrowed-books-summary)
- [🧪 Examples](#-examples)
- [🚨 Error Handling](#-error-handling)
- [🧰 Technologies Used](#-technologies-used)
- [👨‍💻 Contributors](#-contributors)
- [📄 License](#-license)

---

## 🎯 Objective

To create a robust Library Management API that:

- Validates and manages book records.
- Tracks book borrowing with business logic enforcement.
- Supports advanced queries and filtering.
- Uses Mongoose middleware, static/instance methods, and aggregation pipelines.

---

## 🚀 Features

- 📚 Create, read, update, and delete books.
- ✅ Schema validation using Mongoose.
- 📉 Borrowing logic reduces available book copies.
- 🧠 Auto-updates availability based on stock.
- 🔍 Filtering, sorting, and pagination support.
- 🔧 Uses Mongoose middleware, statics, and instance methods.
- 📊 Aggregated borrow summaries using MongoDB pipeline.

---

## 🛠️ Installation

```bash
# Clone the repository
git clone https://github.com/your-username/library-management-api.git
cd library-management-api

# Install dependencies
npm install

# Copy environment file
cp .env.example .env

# Start the development server
npm run dev
