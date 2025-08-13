# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

 
# Book Review App

A MERN stack application to view, add, and review books with authentication.

## Features
User authentication with JWT
- Add,view books
- Rate and review books
- Responsive UI using Tailwind CSS
- RESTful API backend with Express and MongoDB

# Clone the Repository
frontend github repository: https://github.com/amrutharaj20393/bookreview_frontend.git

backend github repository:https://github.com/amrutharaj20393/bookreview_backend.git

vercel link:https://bookreview-frontend-kappa.vercel.app/
# Configure Environment Variables

DATABASE=mongodb+srv://amrutharaj20393:amrutha@cluster0.qakhgut.mongodb.net/bookstore?retryWrites=true&w=majority&appName=Cluster0
JWT_SECRET=secretkey

# Run the application
The command to start the backend and frontend.
frontend:npm run dev
backend:nodemon index.js

# API Routes

POST     /register     for user register
POST     /login         for user login
POST     /addbook       for add a new book details
GET     /allbooks        for get all books details
GET     /viewbook/${id}  for get a single book
PUT     /reviewbook       for add review to a book
GET     /allhomebook      get latest 4 book details for home page

## Screenshots

![LoginPage Screenshot](./assets/loginimage.png)
![Register Screenshot](./assets/registerpage.png)
![Homepage Screenshot](./assets/homepage.png)
![allBooks Screenshot](./assets/allBooks.png)
![a book details Screenshot](./assets/abookdetails.png)
![Add new Book Screenshot](./assets/addBookPage.png)
![Add Review Screenshot](./assets/addreview.png)