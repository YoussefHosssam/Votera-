# 🗳️ Votera – Voting App Backend API

Votera is a backend REST API built with **Node.js** and **Express.js**, designed to support flexible voting systems with **multiple options**, user authentication via **JWT**, scheduled tasks using **cron jobs**, and email notifications through **Nodemailer**. It uses **MongoDB** as the database.

---

## 📦 Features

- 🔐 **JWT-based authentication** (login/signup)
- 🗳️ **Create and manage polls** with multiple options
- ✅ **Vote submission** and validation
- ⏱️ **Automated tasks** with cron jobs (e.g., poll closing)
- 📧 **Email notifications** using Nodemailer
- 📂 JSON-based responses for easy frontend integration

---

## 🛠️ Tech Stack

| Technology     | Description                     |
|----------------|---------------------------------|
| Node.js        | JavaScript runtime              |
| Express.js     | Web framework                   |
| MongoDB        | NoSQL database                  |
| JWT            | Authentication mechanism        |
| Nodemailer     | Email handling                  |
| node-cron      | Task scheduling                  |

---

## 📁 Project Structure
votera/
├── controllers/
├── db/
├── models/
├── routes/
├── middlewares/
├── validators/
├── utils/
└── app.js 

📌 API Endpoints
Here are some key endpoints (JSON-based):

🔐 Auth
POST /api/v1/auth/register – Register a new user

POST /api/v1/auth/login – Authenticate user

🗳️ Polls
POST /api/v1/polls – Create a new poll

GET /api/v1/polls – List all polls

POST /api/v1/polls/:id/vote – Submit a vote

GET /api/v1/polls/:id/results – View poll results

🕒 Cron Jobs
Automatically closes surveys after a specified time and emails subscribed users.

📬 Email Notifications
Votera sends:

Email to subscribers with the results of the closed survey

🚧 Development Status
This project is under active development.

🧑‍💻 Author
Youssef Hossam
