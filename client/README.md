# Blog Application - Client

This is the frontend for the **Blog Application**, built using **Angular**. It allows users to authenticate with **Google and Facebook**, create and manage blog posts, and interact with the backend API.

## Features
- **User authentication** with Google and Facebook
- **JWT-based authentication** for secure API requests
- **Create, edit, delete, and view blog posts**
- **Responsive UI** built with Angular Material
- **State management** using RxJS

---

## Prerequisites
Before running the application, ensure you have the following installed:

- [Node.js](https://nodejs.org/) (Latest LTS recommended)
- [Angular CLI](https://angular.io/cli) (Globally installed)

---

## Environment Variables
Create an `environment.ts` file inside `src/environments/` and add the following configuration:

```typescript
export const environment = {
  production: false,
  apiUrl: 'http://localhost:3000',
  googleClientId: 'your_google_client_id',
  facebookClientId: 'your_facebook_client_id'
};
```

Replace `your_*` values with actual credentials from Google and Facebook.

---

## Installation & Running Locally

1. Clone the repository:
   ```sh
   git clone https://github.com/kamatsaurabh/blogApplication.git
   cd blogApplication/client
   ```

2. Install dependencies:
   ```sh
   npm install
   ```

3. Start the application in development mode:
   ```sh
   ng serve --open
   ```

4. The application will open at `http://localhost:4200`.

---

## Build for Production
To create a production-ready build, run:
```sh
ng build --configuration=production
```
The compiled files will be available in the `dist/` folder.

---

## Running with Docker

You can build and run the frontend using Docker.

1. Build the Docker image:
   ```sh
   docker build -t angular-blog-app .
   ```

2. Run the container:
   ```sh
   docker run -p 4200:80 --name angular-blog-container angular-blog-app
   ```

The application will be accessible at `http://localhost:4200`.

---

## Contributing
Feel free to contribute by submitting issues or pull requests.

---

## License
This project is licensed under the MIT License.

