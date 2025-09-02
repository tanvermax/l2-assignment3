# 📖 Library Management API

A Library Management System built with **Express**, **TypeScript**, and **MongoDB (Mongoose)**.  
This API allows managing books and borrow records with validation, business logic enforcement, aggregation, and filtering features.

---

## 🎯 Objective
Develop a full-featured backend system to manage books and borrowing in a library.  

Key features:
- Proper schema validation
- Business logic enforcement (e.g., book availability control on borrow)
- Aggregation pipeline for borrowed book summaries
- Mongoose static/instance methods
- Mongoose middleware (pre, post)
- Filtering, sorting, and pagination

---

## 🛠️ Tech Stack
- **Express.js** – REST API framework  
- **TypeScript** – Type safety  
- **MongoDB + Mongoose** – Database and ODM  

---

## 📂 Models & Validation

### **Book Model**
| Field        | Type     | Validation / Notes                                                                 |
|--------------|----------|------------------------------------------------------------------------------------|
| `title`      | String   | Required                                                                           |
| `author`     | String   | Required                                                                           |
| `genre`      | String   | Required, must be one of: `FICTION`, `NON_FICTION`, `SCIENCE`, `HISTORY`, `BIOGRAPHY`, `FANTASY` |
| `isbn`       | String   | Required, unique (International Standard Book Number)                              |
| `description`| String   | Optional                                                                           |
| `copies`     | Number   | Required, non-negative integer                                                     |
| `available`  | Boolean  | Defaults to `true`, auto-updated if copies run out                                 |

---

### **Borrow Model**
| Field       | Type     | Validation / Notes                                   |
|-------------|----------|------------------------------------------------------|
| `book`      | ObjectId | Required, references a Book                          |
| `quantity`  | Number   | Required, positive integer                           |
| `dueDate`   | Date     | Required, due date for return                        |

---

## ❌ Generic Error Response
```json
{
  "message": "Validation failed",
  "success": false,
  "error": {
    "name": "ValidationError",
    "errors": {
      "copies": {
        "message": "Copies must be a positive number",
        "name": "ValidatorError",
        "properties": {
          "message": "Copies must be a positive number",
          "type": "min",
          "min": 0
        },
        "kind": "min",
        "path": "copies",
        "value": -5
      }
    }
  }
}
