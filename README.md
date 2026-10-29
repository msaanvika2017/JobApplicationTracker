<div align="center">

# 💼 Job Application Tracker

### Organize your applications. Track your progress. Own your career journey.

A modern full-stack web application to manage job applications, monitor recruitment progress, and keep your job search organized — all in one place.

<br>

![Java](https://img.shields.io/badge/Java-17-orange?style=for-the-badge\&logo=openjdk\&logoColor=white)
![Spring Boot](https://img.shields.io/badge/Spring%20Boot-Backend-6DB33F?style=for-the-badge\&logo=springboot\&logoColor=white)
![React](https://img.shields.io/badge/React-Frontend-61DAFB?style=for-the-badge\&logo=react\&logoColor=black)
![MySQL](https://img.shields.io/badge/MySQL-Database-4479A1?style=for-the-badge\&logo=mysql\&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-Build%20Tool-646CFF?style=for-the-badge\&logo=vite\&logoColor=white)

</div>

---

## ✨ Overview

Job Application Tracker is a full-stack web application built to simplify the job search process.

Instead of tracking opportunities manually, users can manage applications through a centralized dashboard, update recruitment statuses, and view application statistics.

**Designed with a clean interface and a distinctive beige, cobalt blue, and sunshine-yellow palette.**

## 🚀 Features

| Feature                 | Description                                              |
| ----------------------- | -------------------------------------------------------- |
| 📊 Dashboard            | View job application statistics at a glance.             |
| ➕ Add Applications      | Record company names, job roles, dates, and statuses.    |
| 🔄 Update Status        | Track progress as applications move through recruitment. |
| 🗑️ Delete Applications | Remove records when needed.                              |
| 🔎 Filter Applications  | Filter by Applied, Interview, Selected, or Rejected.     |
| 💾 Database Storage     | Store application records in MySQL.                      |
| 🎨 Modern UI            | Enjoy a clean, custom-designed dashboard.                |
| 🔗 REST API             | Connect the React interface to the Spring Boot backend.  |

## 🖥️ Application Preview

> **Screenshots coming soon!** Real application screenshots will be added here.

<!-- Replace this comment with your screenshot after uploading it to GitHub.
Example:
![Application Dashboard](docs/screenshots/dashboard.png)
-->

## 🛠️ Tech Stack

### Frontend

* React
* JavaScript
* Vite
* CSS3

### Backend

* Java 17
* Spring Boot
* Spring Data JPA
* Maven

### Database

* MySQL

### Tools

* Visual Studio Code
* Git and GitHub
* Postman

## 🏗️ Architecture

```text
          ┌──────────────────────┐
          │    React + Vite       │
          │      Frontend         │
          └──────────┬───────────┘
                     │
                 REST API
                     │
          ┌──────────▼───────────┐
          │     Spring Boot      │
          │      Controller      │
          │          ↓           │
          │       Service        │
          │          ↓           │
          │      Repository      │
          └──────────┬───────────┘
                     │
          ┌──────────▼───────────┐
          │    MySQL Database    │
          │     job_tracker      │
          └──────────────────────┘
```

## 📁 Project Structure

```text
JobApplicationTracker/
├── backend/
│   ├── src/main/java/com/saanvika/jobtracker/
│   │   ├── controller/
│   │   ├── entity/
│   │   ├── repository/
│   │   ├── service/
│   │   ├── HealthController.java
│   │   └── JobtrackerApplication.java
│   ├── src/main/resources/
│   └── pom.xml
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── assets/
│   │   ├── App.jsx
│   │   ├── App.css
│   │   ├── index.css
│   │   └── main.jsx
│   └── package.json
│
└── .gitignore
```

## ⚙️ Getting Started

### Prerequisites

Install the following:

* JDK 17
* Node.js and npm
* MySQL Server
* Git

### 1. Clone the repository

```bash
git clone https://github.com/msaanvika2017/JobApplicationTracker.git
cd JobApplicationTracker
```

### 2. Configure the database

Start MySQL and create the database:

```sql
CREATE DATABASE job_tracker;
```

Configure your database connection in:

`backend/src/main/resources/application.properties`

Set your local database username and password using environment variables. Never upload actual passwords or other secrets to GitHub.

### 3. Start the backend

Open a terminal in the project folder:

```powershell
cd backend
```

Set your database credentials in the same PowerShell session, then run:

```powershell
$env:DB_PASSWORD="your_mysql_password"
.\mvnw.cmd spring-boot:run
```

Replace the example password with your own. Keep this terminal open.

Backend URL: `http://localhost:8080`

Health check: `http://localhost:8080/api/health`

### 4. Start the frontend

Open a second terminal in the project folder:

```bash
cd frontend
npm install
npm run dev
```

Open the local address shown by Vite, usually `http://localhost:5173`.

Make sure MySQL and the backend are running before using the application.

## 🔌 API Endpoints

| Method | Endpoint                 | Purpose               |
| ------ | ------------------------ | --------------------- |
| GET    | `/api/health`            | Check backend health  |
| GET    | `/api/applications`      | Retrieve applications |
| POST   | `/api/applications`      | Add an application    |
| PUT    | `/api/applications/{id}` | Update an application |
| DELETE | `/api/applications/{id}` | Delete an application |

## 🎯 What I Learned

* Building REST APIs with Spring Boot
* Organizing backend code into controller, service, and repository layers
* Connecting Java applications to MySQL
* Developing interactive interfaces with React
* Implementing CRUD operations
* Integrating a frontend with a backend API
* Using Git and GitHub for version control

## 🔮 Future Improvements

* Application search
* Interview reminders
* Visual progress charts
* Notes and interview preparation
* User authentication
* Cloud deployment

*These are potential future enhancements.*

## 👩‍💻 Author

**Saanvika Myadharaveni**

Computer Science and Engineering Student

[GitHub Profile](https://github.com/msaanvika2017)

---

<div align="center">

**Built with 💙 to make every job search more organized.**

</div>
