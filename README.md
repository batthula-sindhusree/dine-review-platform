# Dine & Review – Restaurant Review Platform

Dine & Review is a MERN stack web application that allows customers to explore restaurants, submit reviews, and share their dining experiences. It also provides separate dashboards for restaurant owners and administrators to manage restaurant-related activities.

## Features

### Customer
- Customer registration and login.
- Browse available restaurants.
- Search restaurants by name.
- Filter restaurants by location and cuisine.
- View restaurant details, average ratings, and rating distribution.
- Add restaurant reviews and ratings.
- View, edit, and delete own reviews.

### Restaurant Owner
- Owner login and dashboard.
- View assigned restaurant details.
- View customer reviews and ratings.
- Update permitted restaurant details.

### Administrator
- Admin login and dashboard.
- View platform statistics.
- Manage customers and restaurant owners.
- Create and manage restaurants.
- Create owner accounts and assign owners to restaurants.
- View and delete customer reviews.
- Manage users and restaurant records.

## Technologies Used

### Frontend
- React.js
- Vite
- Axios
- React Router DOM
- HTML and CSS

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JSON Web Token (JWT)
- bcryptjs
- dotenv

## Project Structure

```text
restaurant_review_platform/
│
├── backend/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   ├── .env.example
│   ├── server.js
│   └── package.json
│
├── frontend/
│   ├── src/
│   ├── public/
│   ├── index.html
│   └── package.json
│
├── postman/
│   └── Dine-Review.postman_collection.json
│
├── .gitignore
└── README.md
```

## Installation and Setup

### Prerequisites
- Node.js and npm
- MongoDB database
- Git

### 1. Clone the Repository

```bash
git clone YOUR_GITHUB_REPOSITORY_URL
cd restaurant_review_platform
```

### 2. Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file inside the backend folder using `.env.example` as a reference.

Add the following environment variables with your own values:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
ADMIN_EMAIL=your_admin_email
```

Start the backend server:

```bash
npm run dev
```

Backend API runs at:

`http://localhost:5000`

### 3. Frontend Setup

Open a second terminal in the project folder:

```bash
cd frontend
npm install
npm run dev
```

Open the local URL displayed by Vite in your browser.

## API Routes

| Module | Base Route |
|---|---|
| Authentication | `/api/auth` |
| Restaurants | `/api/restaurants` |
| Reviews | `/api/reviews` |
| Administrator | `/api/admin` |
| Restaurant Owner | `/api/owner` |

## Postman API Collection

The Postman collection is available at:

`postman/Dine-Review.postman_collection.json`

Import this file into Postman to test the API endpoints.

Set the required authentication tokens and IDs in the collection variables before testing protected endpoints.

## Security

- Password hashing using bcryptjs.
- JWT-based authentication.
- Role-based