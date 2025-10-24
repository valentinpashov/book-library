# Book Library Project

This project is a web application for managing a book library, developed using JavaScript and utilizing HTML and CSS for the user interface.

## Technologies

- **Node.js** 
- **Express.js**
- **Handlebars (HBS)** - Templating engine for generating dynamic HTML pages.
- **JavaScript** 
- **HTML/CSS** 
- **Docker** 

## Installation and Running

1. Clone the repository:
   ```bash
   git clone <repository-url>
   ```

2. Install the required packages:
   ```bash
   npm install
   ```

3. Run the application in development mode:
   ```bash
   npm run dev
   ```

## Database

Originally, a database connection was planned, but due to configuration issues, data is currently stored in objects.

## Tests

Unit tests have been implemented for all major files. To run the tests, execute:

```bash
npm test
```

## Dockerization

The project can be run in a Docker container. Use the following commands to build and start:

```bash
docker-compose up --build
```
