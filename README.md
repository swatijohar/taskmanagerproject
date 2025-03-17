# Task Manager Application

A modern, responsive Task Manager web application built with React, TypeScript, and TailwindCSS for the frontend, and Node.js, Express, and MongoDB for the backend. This application allows users to manage their tasks effectively with features like adding, updating, deleting, and marking tasks as completed.

## Features

- ✨ Create new tasks with title and description
- ✅ Mark tasks as completed
- 📝 Edit existing tasks
- 🗑️ Delete tasks
- 📱 Fully responsive design
- 🎨 Modern and clean UI with TailwindCSS
- 🚀 Built with React and TypeScript for type safety
- 💾 Data persistence with MongoDB
- 🔄 RESTful API with Express

## Prerequisites

Before running this project, make sure you have the following installed:
- Node.js (v14 or higher)
- npm (v6 or higher)
- MongoDB (local installation or MongoDB Atlas account)

## Getting Started

### Setting up MongoDB

1. Install MongoDB locally or create a free MongoDB Atlas account
2. If using MongoDB Atlas:
   - Create a new cluster
   - Get your connection string
   - Replace the MONGODB_URI in `server/.env` with your connection string

### Starting the Backend Server

1. Navigate to the server directory:
   ```bash
   cd server
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the server directory with the following content:
   ```
   MONGODB_URI=mongodb://localhost:27017/taskmanager
   PORT=5000
   ```
   Note: Replace the MONGODB_URI with your MongoDB connection string if using Atlas

4. Start the server:
   ```bash
   npm run dev
   ```

### Starting the Frontend Application

1. Open a new terminal and navigate to the project root directory

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open your browser and visit `http://localhost:5173`

## Project Structure

```
task-manager/
├── src/                  # Frontend source files
│   ├── components/      # React components
│   ├── types/          # TypeScript type definitions
│   ├── App.tsx        # Main application component
│   └── main.tsx       # Application entry point
├── server/              # Backend source files
│   ├── src/
│   │   ├── models/    # MongoDB models
│   │   └── index.js   # Server entry point
│   └── package.json   # Backend dependencies
├── public/             # Static assets
└── package.json        # Frontend dependencies
```

## API Endpoints

- GET `/api/tasks` - Get all tasks
- POST `/api/tasks` - Create a new task
- PATCH `/api/tasks/:id` - Update a task
- DELETE `/api/tasks/:id` - Delete a task

## Available Scripts

### Frontend
- `npm run dev` - Starts the development server
- `npm run build` - Builds the app for production
- `npm run preview` - Previews the production build locally
- `npm run lint` - Runs ESLint to check code quality

### Backend
- `npm run dev` - Starts the development server with hot reload
- `npm start` - Starts the server in production mode

## Technologies Used

### Frontend
- [React](https://reactjs.org/) - Frontend library
- [TypeScript](https://www.typescriptlang.org/) - Type safety
- [Vite](https://vitejs.dev/) - Build tool and development server
- [TailwindCSS](https://tailwindcss.com/) - Utility-first CSS framework
- [React Router](https://reactrouter.com/) - Navigation
- [Lucide React](https://lucide.dev/) - Icons
- [React Hot Toast](https://react-hot-toast.com/) - Toast notifications
- [Axios](https://axios-http.com/) - HTTP client

### Backend
- [Node.js](https://nodejs.org/) - Runtime environment
- [Express](https://expressjs.com/) - Web framework
- [MongoDB](https://www.mongodb.com/) - Database
- [Mongoose](https://mongoosejs.com/) - MongoDB object modeling
- [Cors](https://www.npmjs.com/package/cors) - Cross-origin resource sharing
- [Dotenv](https://www.npmjs.com/package/dotenv) - Environment variables

## Future Improvements

- [ ] Add authentication
- [ ] Implement task categories/tags
- [ ] Add due dates for tasks
- [ ] Implement task search and filtering
- [ ] Add drag-and-drop for task reordering
- [ ] Implement dark mode
- [ ] Add pagination for tasks list
- [ ] Add task priority levels
- [ ] Implement task sharing between users

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.