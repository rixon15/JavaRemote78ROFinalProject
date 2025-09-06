# Online Shop Application

A full-stack e-commerce platform featuring a Java Spring Boot backend and an Angular frontend. This project is a comprehensive application that demonstrates key concepts in modern web development, including user management, product catalog browsing, a shopping cart system, and an administrative dashboard for full control over the application's data.

## Features

- **User Authentication:** Secure login and registration for both customers and administrators.
- **Product Management:** Browse, view details, and add products to a dynamic shopping cart.
- **Order Management:** Place and track new orders.
- **Admin Dashboard:** A dedicated interface for administrators to perform **CRUD** (Create, Read, Update, Delete) operations on users, products, and commands. Includes soft-delete functionality to deactivate items without permanently removing them.
- **Responsive Design:** The application's frontend adapts to different screen sizes for a seamless user experience on all devices.

## Technologies

### Backend
- **Language:** Java 17+
- **Framework:** Spring Boot 3.4.1
- **Database:** MySQL
- **ORM:** Spring Data JPA
- **Dependencies:** Lombok, jbcrypt for password hashing.
- **Testing:** JUnit, Mockito for unit testing.

### Frontend
- **Framework:** Angular 19+
- **Language:** TypeScript
- **UI Components:** Angular Material
- **State Management:** Uses RxJS with `BehaviorSubject` for local application state.

### Infrastructure
- **Containerization:** Docker, Docker Compose
- **Build Tool:** Maven Wrapper (`mvnw`)

## Architecture

This project follows a decoupled, two-part architecture:
- **`Backend-Shop-Online-App/`**: A RESTful API that handles all business logic, data persistence, and serves data to the frontend.
- **`Frontend-Shop-Online-App/`**: A single-page application (SPA) that consumes the backend API and provides the user interface.

## Getting Started

### Prerequisites
Before you begin, ensure you have the following installed on your machine:
- **Java Development Kit (JDK) 21**
- **Node.js**
- **Docker**
- **Maven** (or use the provided Maven Wrapper)

### 1. Database Setup with Docker

The easiest way to set up the database is with Docker Compose.
1. Navigate to the `Backend-Shop-Online-App/` directory.
2. Run the following command to start the MySQL database container:
   ```bash
   docker-compose up -d
