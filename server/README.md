# Blog Application - Server

This is the backend server for the **Blog Application**, built using **NestJS**. It supports **Google and Facebook authentication** and provides APIs for managing blog posts.

## Features
- User authentication with **Google and Facebook** (via PassportJS)
- **JWT-based authentication** for securing APIs
- **CRUD operations** for managing blog posts
- **MongoDB** database integration
- **Microservices architecture** for scalability
- **Docker support** for easy deployment

---

## Prerequisites
Before running the application, ensure you have the following installed:

- [Node.js](https://nodejs.org/) (Latest LTS recommended)
- [MongoDB](https://www.mongodb.com/) (Local or Atlas instance)
- [Docker](https://www.docker.com/) (For containerized deployment)

---

## Environment Variables
Create a `.env` file in the root directory and add the following environment variables:

```env
PORT=3000
MONGO_URI=mongodb://localhost:27017/blog_db
JWT_SECRET=your_jwt_secret
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
FACEBOOK_CLIENT_ID=your_facebook_client_id
FACEBOOK_CLIENT_SECRET=your_facebook_client_secret
```

Replace `your_*` values with actual credentials from Google and Facebook.

---

## Installation & Running Locally
1. Clone the repository:
   ```sh
   git clone https://github.com/kamatsaurabh/blogApplication.git
   cd blogApplication/server
   ```

2. Install dependencies:
   ```sh
   npm install
   ```

3. Start the application in development mode:
   ```sh
   npm run start:dev
   ```

4. Open `http://localhost:3000` in your browser or Postman to access the API.

---

## API Endpoints

### Authentication
- **POST** `/auth/google` → Authenticate with Google
- **POST** `/auth/facebook` → Authenticate with Facebook

### Blog Posts
- **GET** `/posts` → Get all blog posts
- **GET** `/posts/:id` → Get a single blog post
- **POST** `/posts` → Create a new blog post (Authenticated)
- **PUT** `/posts/:id` → Update a blog post (Authenticated)
- **DELETE** `/posts/:id` → Delete a blog post (Authenticated)

---

## Running with Docker

You can build and run the application using Docker.

1. Build the Docker image:
   ```sh
   docker build -t nestjs-app .
   ```

2. Run the container:
   ```sh
   docker run -p 3000:3000 --name nestjs-container nestjs-app
   ```

The server will be running at `http://localhost:3000`.

---

## Contributing
Feel free to contribute by submitting issues or pull requests.

---

## License
This project is licensed under the MIT License.