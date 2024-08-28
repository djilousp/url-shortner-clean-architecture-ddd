# URL Shortener

This project is a URL Shortener Service built using Node.js, TypeScript, and MySQL. The service allows users to create shortened URLs and provides endpoints for redirecting to the original URLs. It also tracks click analytics and implements rate limiting.

## Prerequisites

- Node.js (latest stable version)
- Docker & Docker Compose
- MySQL

## Project Structure

- **src/index.ts**: Project's entrypoint.
- **src/domain**: Contains domain entities, domain error, value objects, and repositories contracts.
- **src/application**: Contains application use cases.
- **src/infrastructure**: Contains infrastructure-related code, such as repositories implementations, database client, and init config of the database tables.
- **src/presentation**: Contains Express.js controllers and routes, middleware, and controllers.

- **config/**: Configuration folder based on the running environnement (it only contains dev.ts for local development env for now)
- **test/**: Tests Folder.

## Running the Project

### 1. Clone the Repository

```bash
git clone <repo-url>
```

### 2. Build and run the project

**By simply running:**

```bash
docker-compose up
```
