# Jobs API <img src="assets/logo.png" alt="drawing" width="27px"/>

This project provides APIs for user registration and login functionality. 
After registering, individuals can log in using the designated login API to access a range of job-related actions, 
including **creating, updating, deleting, retrieving individual jobs, and obtaining a list of all jobs.** 
The system accommodates multiple user registrations, storing specific jobs for each user. Only the **logged-in user can manage their respective set of jobs.** 

Security measures, specifically JWT, is implemented to protect access to job-related resources. Meanwhile, the authentication endpoints 
are publicly available for user registration and login purposes.

More information on the exposed web services can be found in the below API documentation.
The **auth** resource is publicly accessible, whereas the **jobs** resource is considered a protected asset, requiring a JWT for accessing its endpoints.

- [**Auth API documentation**](https://documenter.getpostman.com/view/25306703/2s9Ykj9i9d)
- [**Jobs API documentation**](https://documenter.getpostman.com/view/25306703/2s9Ykj9iDu#ab300a14-01fb-4b88-a391-dd202b47355b)

#### Highlighted features of the application,
- Multiple users can register to the system and a user can have multiple jobs.
- The manipulation of a specific job list of the logged user is restricted to the user who are logged in.

## Used Technologies
- Node.js
- Express.js
- Mongoose
- MongoDB

#### Used Integrated Development Environment
- VS Code

## How to use ?

1. Clone the project using `https://github.com/PubuduJ/jobs-api.git` terminal command.
2. Change the `MongoDB configuration properties` in the `.env` file to your local machine MongoDB configurations.
3. Open the terminal from the project directory and run `npm install` and `npm start` to run the server.

## Version
v1.0.0

## License
Copyright &copy; 2023 [Pubudu Janith](https://www.linkedin.com/in/pubudujanith/). All Rights Reserved.<br>
This project is licensed under the [MIT license](LICENSE.txt).