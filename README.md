# Online Shop Application

A full-stack e-commerce platform built with a Java Spring Boot backend and an Angular frontend. This project is a comprehensive example of a modern web application, featuring user management, product browsing, a shopping cart, and an administrative dashboard for full control over the application's data.

## Features

-   **User Authentication:** Secure login and registration for both customers and administrators.
-   **Product Catalog:** Browse, view details, and add products to a dynamic shopping cart.
-   **Shopping Cart:** Manage products before checkout.
-   **Order Management:** Place and track orders.
-   **Admin Dashboard:** **CRUD** operations for users, products, and commands with soft-delete functionality.
-   **Responsive Design:** The application's frontend adapts to different screen sizes for a seamless user experience on all devices.

## Technologies

### Backend
-   **Language:** Java 21
-   **Framework:** Spring Boot 3.4.1
-   **Database:** MySQL
-   **ORM:** Spring Data JPA
-   **Dependencies:** Lombok, jbcrypt for password hashing.
-   **Testing:** JUnit, Mockito for unit testing.

### Frontend
-   **Framework:** Angular 19+
-   **Language:** TypeScript
-   **UI Components:** Angular Material
-   **State Management:** Uses RxJS with `BehaviorSubject` for local application state.

### Infrastructure
-   **Containerization:** Docker, Docker Compose
-   **Build Tool:** Maven Wrapper (`mvnw`)

## Architecture

This project follows a decoupled, two-part architecture:
-   **`Backend-Shop-Online-App/`**: A RESTful API server.
-   **`Frontend-Shop-Online-App/`**: A single-page application (SPA) that consumes the backend API and provides the user interface.

## Getting Started

### Prerequisites
Before you begin, ensure you have the following installed on your machine:
-   **Java Development Kit (JDK) 21**
-   **Node.js**
-   **Docker**
-   **Maven** (or use the provided Maven Wrapper)

### 1. Database Setup with Docker

The easiest way to set up the database is with Docker Compose.
1.  Navigate to the `Backend-Shop-Online-App/` directory.
2.  Run the following command to start the MySQL database container:
    ```bash
    docker-compose up -d
    ```
3.  The database schema and initial data will be automatically created on application startup. You can find the dump file in the `DatabaseExport/` folder.

### 2. Backend Setup & Run

1.  Open the `Backend-Shop-Online-App/` folder in your IDE (e.g., IntelliJ IDEA).
2.  Configure the database connection in `src/main/resources/application.properties` with your MySQL user credentials.
    ```properties
    spring.datasource.url=jdbc:mysql://localhost:3306/shop_online_manager_db
    spring.datasource.username=root
    spring.datasource.password=root
    ```
3.  Run the `BackendShopApplication.java` file to start the Spring Boot server. The server will run on `http://localhost:8081`.

### 3. Frontend Setup & Run

1.  Open a new terminal and navigate to the `Frontend-Shop-Online-App/` directory.
2.  Install the necessary npm packages:
    ```bash
    npm install
    ```
3.  Start the Angular development server:
    ```bash
    ng serve
    ```
4.  Open your web browser and go to `http://localhost:4200/` to view the application.

## API Documentation

A Postman collection with all available API endpoints is provided in `Backend-Shop-Online-App/Online_Shop.postman_collection.json`. You can import this file into Postman to test the backend API directly.

## Author

-   **Author:** Ivacsony Szilard
-   **Group:** JavaRemoteRo78
