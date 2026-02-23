# UpShare

UpShare is a web application that allows users to upload and share files with others. It provides a simple and convenient way to store and distribute files, making it easy for users to collaborate and exchange resources.

## Features

- **File Upload**: Users can easily upload files to the platform, allowing them to store their documents, images, videos, and more.
- **Share Links**: Each uploaded file is assigned a unique shareable link, making it effortless for users to distribute and share files with others.
- **User Authentication**: To ensure security and privacy, UpShare implements user authentication, requiring users to register and log in before accessing the platform's features.
- **User Management**: Registered users have access to a personalized dashboard where they can manage their uploaded files, view shared links, and perform other account-related activities.
- **Search Functionality**: UpShare includes a search feature that enables users to search for files based on keywords, file types, or other relevant criteria.
- **Responsive Design**: The application is built with a responsive design, ensuring that users can access and utilize UpShare seamlessly across various devices and screen sizes.

## Installation

To set up UpShare locally, follow these steps:

1. Clone the repository:

   ```
   git clone https://github.com/Aniket-lodh/upshare.git
   ```

2. Install the required dependencies using npm:

   ```
   npm install
   ```

3. Set up the environment variables:
   - Create a `.env` file in the project's root directory.
   - Define the following variables in the `.env` file:
     - `MONGODB_URI`: The URI for your MongoDB database.
     - `SESSION_SECRET`: A secret key used for session management.
     - `PORT`: The port on which the application will run (default is 3000).

4. Start the application:

   ```
   npm start
   ```

5. Access the application by navigating to `http://localhost:3000` in your web browser.

## Technologies Used

- **Node.js**: A JavaScript runtime environment for server-side development.
- **Express**: A web application framework for Node.js, used to build the server-side components of UpShare.
- **MongoDB**: A NoSQL database used for storing user information, file metadata, and other relevant data.
- **Mongoose**: An object modeling tool for Node.js and MongoDB, providing a straightforward way to interact with the database.
- **Multer**: A middleware for handling file uploads in Node.js.
- **Passport**: An authentication middleware used to handle user authentication and session management.
- **Bootstrap**: A popular CSS framework used for responsive design and enhancing the application's overall visual appeal.

## Contributing

Contributions to UpShare are welcome! If you encounter any issues, have suggestions for improvements, or would like to add new features, please submit an issue or a pull request to the repository.

## License

UpShare is released under the [MIT License](https://github.com/Aniket-lodh/upshare/blob/main/LICENSE). Feel free to use, modify, and distribute the code as per the terms of the license.

## Disclaimer

Please note that UpShare is an open-source project and is provided as-is without any warranty or guarantee of its performance, reliability, or suitability for any specific purpose. The developers of UpShare are not responsible for any damages or liabilities resulting from the use of the application.