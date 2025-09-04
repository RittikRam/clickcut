# ✂️ ClickCut

**A lightweight URL shortener built with Spring Boot and PostgreSQL.**

---

## Table of Contents
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Setup Instructions](#setup-instructions)
- [Usage](#usage)
- [Configuration](#configuration)
- [Project Structure](#project-structure)
- [Development & Contribution](#development--contribution)
- [License](#license)

---

## Features
- Shorten long URLs into compact, shareable links
- Built using **Spring Boot** for rapid development and RESTful design
- Persists URL mappings securely using **PostgreSQL**
- Easily scalable and extensible
- No external dependencies beyond the database

---

## Tech Stack
- **Language:** Java  
- **Framework:** Spring Boot  
- **Database:** PostgreSQL  
- **Build Tool:** Maven  
- (Optional) Spring Data JPA for ORM handling

---

## Getting Started

### Prerequisites
- Java 17+ (or the version specified by the project)
- Maven 3.6+
- PostgreSQL

---

### Setup Instructions

1. **Clone the repository**
   ```bash
   git clone https://github.com/RittikRam/clickcut.git
   cd clickcut
2. **Configure the database**
    Create a PostgreSQL database and note the connection details.
3. **Add environment-specific configuration in application.properties or application.yml:**
    spring.datasource.url=jdbc:postgresql://localhost:5432/your_db_name
    spring.datasource.username=your_username
    spring.datasource.password=your_password

    spring.jpa.hibernate.ddl-auto=update
    spring.jpa.show-sql=true
4. **Build and run the application**
    mvn clean install
    mvn spring-boot:run
The application will start on http://localhost:8080  by default.


├── src/main/java/...

│   ├── controller/        ← REST controllers

│   ├── model/             ← Entity definitions (e.g. URL mappings)

│   ├── repository/        ← JPA repositories

│   ├── service/           ← Business logic layer

│   └── ClickCutApplication.java ← Main Spring Boot application

└── pom.xml                ← Project dependencies and configurations


Development & Contribution

Create a branch for your feature:
git checkout -b feature/your-feature

Commit your changes:
git commit -m "Describe your changes"

Push to your fork:
git push origin feature/your-feature

Submit a Pull Request – ensure your code includes tests and follows clean coding practices.
